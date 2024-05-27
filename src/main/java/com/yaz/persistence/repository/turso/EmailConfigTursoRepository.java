package com.yaz.persistence.repository.turso;

import com.yaz.api.domain.response.EmailConfigDto;
import com.yaz.api.domain.response.EmailConfigTableItem;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.SqlUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.query.EmailConfigQuery;
import com.yaz.persistence.entities.EmailConfig;
import com.yaz.persistence.repository.EmailConfigRepository;
import com.yaz.persistence.repository.turso.client.TursoWsService;
import com.yaz.persistence.repository.turso.client.ws.request.Stmt;
import com.yaz.persistence.repository.turso.client.ws.request.Value;
import com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.Row;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
////@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EmailConfigTursoRepository implements EmailConfigRepository {

  private static final String COLLECTION = "email_configs";
  private static final String READ = "SELECT * FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String EXISTS = "SELECT id FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String DELETE = "DELETE FROM %s WHERE id = ?".formatted(COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (id, subject, email, name, picture, given_name, file, file_size, hash, active, is_available, has_refresh_token, expires_in) VALUES (%s);
      """.formatted(COLLECTION, SqlUtil.params(13));

  private static final String COMMON_FIELDS = """
      id, subject, email, name, picture, given_name, file_size, hash, active,
      is_available, has_refresh_token, expires_in, created_at,
      updated_at, last_check_at, stacktrace
      """;

  private static final String SELECT_WITH_FIELDS = """
      SELECT %s FROM email_configs %s ORDER BY id ASC LIMIT ?;
      """;
  private static final String READ_WITH_FIELDS = """
      SELECT %s FROM email_configs WHERE id = ?;
      """;

  private static final String UPDATE = """
      UPDATE %s
      SET file = ?, file_size = ?, hash = ?, is_available = ?, has_refresh_token = ?, expires_in = ?, updated_at = ?, 
      last_check_at = ?, stacktrace = ? WHERE id = ?;
      """.formatted(COLLECTION);
  private static final String SELECT_DISPLAY = """
      SELECT id, subject, email, name, picture, given_name FROM email_configs ORDER BY email DESC;
      """;

  private static final String UPDATE_LAST_CHECK = """
      UPDATE %s
      SET has_refresh_token = ?, expires_in = ?, last_check_at = ?, is_available = true, stacktrace = null
      WHERE id = ?;
      """.formatted(COLLECTION);

  private final TursoWsService tursoWsService;

  @Override
  public Uni<Long> count() {
    return tursoWsService.count("id", COLLECTION);
  }

  @Override
  public Uni<Integer> delete(String id) {
    return tursoWsService.executeQuery(Stmt.stmt(DELETE, Value.text(id)))
        .map(executeResp -> executeResp.result().rowCount());
  }

  @Override
  public Uni<Boolean> exists(String id) {
    return tursoWsService.selectOne(Stmt.stmt(EXISTS, Value.text(id)), row -> row.getString("id") != null)
        .map(opt -> opt.orElse(false));
  }


  @Override
  public Uni<Optional<EmailConfig>> read(String id) {
    return tursoWsService.selectOne(Stmt.stmt(READ, Value.text(id)), this::from);
  }

  private EmailConfig from(Row row) {

    return EmailConfig.builder()
        .id(row.getString("id"))

        .subject(row.getString("subject"))
        .email(row.getString("email"))
        .name(row.getString("name"))
        .picture(row.getString("picture"))
        .givenName(row.getString("given_name"))

        .file(row.getBlob("file"))
        .fileSize(row.getLong("file_size"))
        .hash(row.getLong("hash"))
        .active(row.getBoolean("active"))
        .isAvailable(row.getBoolean("is_available"))
        .hasRefreshToken(row.getBoolean("has_refresh_token"))
        .expiresIn(row.getLong("expires_in"))
        .createdAt(row.getLocalDateTime("created_at"))
        .updatedAt(row.getLocalDateTime("updated_at"))
        .lastCheckAt(row.getLocalDateTime("last_check_at"))
        .stacktrace(row.getString("stacktrace"))
        .build();
  }


  @Override
  public Uni<Integer> create(EmailConfig emailConfig) {

    final var stmt = Stmt.stmt(INSERT, Value.text(emailConfig.id()), Value.text(emailConfig.subject()),
        Value.text(emailConfig.email()),
        Value.text(emailConfig.name()), Value.text(emailConfig.picture()), Value.text(emailConfig.givenName()),
        Value.blob(emailConfig.file()),
        Value.number(emailConfig.fileSize()), Value.number(emailConfig.hash()), Value.bool(emailConfig.active()),
        Value.bool(emailConfig.isAvailable()), Value.bool(emailConfig.hasRefreshToken()),
        Value.number(emailConfig.expiresIn())
    );

    return tursoWsService.executeQuery(stmt)
        .map(executeResp -> executeResp.result().rowCount());
  }

  private Stmt selectQuery(EmailConfigQuery query) {
    final var lastId = StringUtil.trimFilter(query.lastId());
    if (lastId == null) {

      return Stmt.stmt(SELECT_WITH_FIELDS.formatted(COMMON_FIELDS, ""), Value.number(query.limit()));
    }

    final var sql = SELECT_WITH_FIELDS.formatted(COMMON_FIELDS, "WHERE id > ?");

    return Stmt.stmt(sql, Value.text(lastId), Value.number(query.limit()));
  }

  @Override
  public Uni<List<EmailConfig>> select(EmailConfigQuery query) {
    return tursoWsService.selectQuery(selectQuery(query), this::from);
  }

  @Override
  public Uni<Integer> update(EmailConfig emailConfig) {

    final var stmt = Stmt.stmt(UPDATE,
        Value.blob(emailConfig.file()), Value.number(emailConfig.fileSize()),
        Value.number(emailConfig.hash()), Value.bool(emailConfig.isAvailable()),
        Value.bool(emailConfig.hasRefreshToken()),
        Value.number(emailConfig.expiresIn()), Value.text(emailConfig.updatedAt()),
        Value.text(emailConfig.lastCheckAt()),
        Value.text(emailConfig.stacktrace()), Value.text(emailConfig.id())
    );

    return tursoWsService.executeQuery(stmt)
        .map(executeResp -> executeResp.result().rowCount());
  }

  @Override
  public Uni<Optional<EmailConfigTableItem>> readWithUser(String id) {

    return tursoWsService.selectOne(Stmt.stmt(READ_WITH_FIELDS.formatted(COMMON_FIELDS), Value.text(id)),
            this::from)
        .map(opt -> opt.map(EmailConfigTableItem::ofItem));
  }


  @Override
  public Uni<List<EmailConfigDto>> displayList() {
    return tursoWsService.selectQuery(SELECT_DISPLAY, this::fromDisplay);
  }

  @Override
  public Uni<Optional<byte[]>> getFile(String userId) {
    return tursoWsService.selectOne(Stmt.stmt(READ, Value.text(userId)), row -> row.getBlob("file"));
  }

  @Override
  public Uni<Integer> updateLastCheck(String userId, boolean hasRefreshToken, Long expiresIn) {

    final var stmt = Stmt.stmt(UPDATE_LAST_CHECK,
        Value.bool(hasRefreshToken), Value.number(expiresIn), Value.text(DateUtil.utcLocalDateTime()),
        Value.text(userId)
    );

    return tursoWsService.executeQuery(stmt)
        .map(executeResp -> executeResp.result().rowCount());
  }

  private EmailConfigDto fromDisplay(Row row) {
    return EmailConfigDto.builder()
        .id(row.getString("id"))
        .email(row.getString("email"))
        .username(row.getString("giver_name"))
        .name(row.getString("name"))
        .picture(row.getString("picture"))
        .build();
  }
}
