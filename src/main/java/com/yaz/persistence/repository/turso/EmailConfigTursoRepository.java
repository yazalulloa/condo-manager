package com.yaz.persistence.repository.turso;

import com.yaz.api.domain.response.EmailConfigDto;
import com.yaz.api.domain.response.EmailConfigTableItem;
import com.yaz.core.util.DateUtil;
import com.yaz.core.util.SqlUtil;
import com.yaz.core.util.StringUtil;
import com.yaz.persistence.domain.EmailConfigUser;
import com.yaz.persistence.domain.IdentityProvider;
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
  private static final String READ = "SELECT * FROM %s WHERE user_id = ?".formatted(COLLECTION);
  private static final String EXISTS = "SELECT user_id FROM %s WHERE user_id = ?".formatted(COLLECTION);
  private static final String DELETE = "DELETE FROM %s WHERE user_id = ?".formatted(COLLECTION);
  private static final String INSERT = """
      INSERT INTO %s (user_id, file, file_size, hash, active, is_available, has_refresh_token, expires_in) VALUES (%s);
      """.formatted(COLLECTION, SqlUtil.params(8));

  private static final String COMMON_FIELDS = """
      email_configs.user_id, email_configs.file_size, email_configs.hash, email_configs.active,
      email_configs.is_available, email_configs.has_refresh_token, email_configs.expires_in, email_configs.created_at,
      email_configs.updated_at, email_configs.last_check_at, email_configs.stacktrace
      """;

  private static final String SELECT_WITH_USER = """
      SELECT %s,
      users.provider_id, users.provider, users.email, users.username, users.name, users.picture
           FROM email_configs
           LEFT JOIN users ON email_configs.user_id = users.id
            %s
      GROUP BY email_configs.user_id
      ORDER BY email_configs.user_id ASC LIMIT ?;
      """;
  private static final String READ_WITH_USER = """
      SELECT %s, users.provider_id, users.provider, users.email, users.username, users.name, users.picture
         FROM email_configs
         INNER JOIN users ON email_configs.user_id = users.id
         WHERE email_configs.user_id = ?;
      """;

  private static final String UPDATE = """
      UPDATE %s
      SET file = ?, file_size = ?, hash = ?, is_available = ?, has_refresh_token = ?, expires_in = ?, updated_at = ?, 
      last_check_at = ?, stacktrace = ? WHERE user_id = ?;
      """.formatted(COLLECTION);
  private static final String SELECT_DISPLAY = """
      SELECT email_configs.user_id,users.email, users.username, users.name, users.picture
           FROM email_configs
           LEFT JOIN users ON email_configs.user_id = users.id
      ORDER BY users.email DESC;
      """;

  private static final String UPDATE_LAST_CHECK = """
      UPDATE %s
      SET has_refresh_token = ?, expires_in = ?, last_check_at = ?, is_available = true, stacktrace = null
      WHERE user_id = ?;
      """.formatted(COLLECTION);

  private final TursoWsService tursoWsService;

  @Override
  public Uni<Long> count() {
    return tursoWsService.count("user_id", COLLECTION);
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
        .userId(row.getString("user_id"))
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

  private EmailConfigUser.User userFrom(Row row) {
    return EmailConfigUser.User.builder()
        .providerId(row.getString("provider_id"))
        .provider(row.getEnum("provider", IdentityProvider::valueOf))
        .email(row.getString("email"))
        .username(row.getString("username"))
        .name(row.getString("name"))
        .picture(row.getString("picture"))
        .build();
  }

  private EmailConfigUser fromWithUser(Row row) {
    return new EmailConfigUser(userFrom(row), from(row));
  }

  @Override
  public Uni<Integer> create(EmailConfig emailConfig) {

    final var stmt = Stmt.stmt(INSERT, Value.text(emailConfig.userId()), Value.blob(emailConfig.file()),
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

      return Stmt.stmt(SELECT_WITH_USER.formatted(COMMON_FIELDS, ""), Value.number(query.limit()));
    }

    final var sql = SELECT_WITH_USER.formatted(COMMON_FIELDS, "WHERE email_configs.user_id > ?");

    return Stmt.stmt(sql, Value.text(lastId), Value.number(query.limit()));
  }

  @Override
  public Uni<List<EmailConfigUser>> select(EmailConfigQuery query) {
    return tursoWsService.selectQuery(selectQuery(query), this::fromWithUser);
  }

  @Override
  public Uni<Integer> update(EmailConfig emailConfig) {

    final var stmt = Stmt.stmt(UPDATE,
        Value.blob(emailConfig.file()), Value.number(emailConfig.fileSize()),
        Value.number(emailConfig.hash()), Value.bool(emailConfig.isAvailable()),
        Value.bool(emailConfig.hasRefreshToken()),
        Value.number(emailConfig.expiresIn()), Value.text(emailConfig.updatedAt()),
        Value.text(emailConfig.lastCheckAt()),
        Value.text(emailConfig.stacktrace()), Value.text(emailConfig.userId())
    );

    return tursoWsService.executeQuery(stmt)
        .map(executeResp -> executeResp.result().rowCount());
  }

  @Override
  public Uni<Optional<EmailConfigTableItem>> readWithUser(String id) {

    return tursoWsService.selectOne(Stmt.stmt(READ_WITH_USER.formatted(COMMON_FIELDS), Value.text(id)),
            this::fromWithUser)
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
        .id(row.getString("user_id"))
        .email(row.getString("email"))
        .username(row.getString("username"))
        .name(row.getString("name"))
        .picture(row.getString("picture"))
        .build();
  }
}
