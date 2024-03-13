package com.yaz.persistence.repository.turso;

import com.yaz.client.turso.response.TursoResponse;
import com.yaz.client.turso.response.TursoResponse.Row;
import com.yaz.persistence.domain.EmailConfigUser;
import com.yaz.persistence.domain.IdentityProvider;
import com.yaz.persistence.domain.query.EmailConfigQuery;
import com.yaz.persistence.entities.EmailConfig;
import com.yaz.persistence.repository.EmailConfigRepository;
import com.yaz.resource.domain.response.EmailConfigDto;
import com.yaz.resource.domain.response.EmailConfigTableItem;
import com.yaz.util.SqlUtil;
import com.yaz.util.StringUtil;
import io.quarkus.arc.lookup.LookupIfProperty;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@LookupIfProperty(name = "app.repository.impl", stringValue = "turso")
//@Named("turso")
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class EmailConfigTursoRepository implements EmailConfigRepository {

  private static final String COLLECTION = "email_configs";

  private static final String ALL = "SELECT * FROM %s %s ORDER BY created_at DESC";

  private static final String SELECT = "SELECT * FROM %s %s ORDER BY created_at DESC LIMIT ?";
  private static final String READ = "SELECT * FROM %s WHERE user_id = %s";
  private static final String EXISTS = "SELECT user_id FROM %s WHERE user_id = %s";
  private static final String DELETE = "DELETE FROM %s WHERE user_id = %s";
  private static final String INSERT = """
      INSERT INTO %s (user_id, file, file_size, hash, active, is_available, has_refresh_token, expires_in) VALUES (%s);
      """;

  private static final String SELECT_FULL = """
      SELECT email_configs.*, users.provider_id, users.provider, users.email, users.username, users.name, users.picture
           FROM email_configs
           LEFT JOIN users ON email_configs.user_id = users.id
            %s
      ORDER BY email_configs.user_id DESC LIMIT %s;
      """;
  private static final String READ_WITH_USER = """
      SELECT email_configs.*, users.provider_id, users.provider, users.email, users.username, users.name, users.picture
         FROM email_configs
         INNER JOIN users ON email_configs.user_id = users.id
         WHERE email_configs.user_id = %s;
      """;

  private static final String UPDATE = """
      UPDATE %s
      SET file = %s, file_size = %s, hash = %s, is_available = %s, has_refresh_token = %s, expires_in = %s, updated_at = %s, 
      last_check_at = %s, stacktrace = %s WHERE user_id = %s;
      """;
  private static final String SELECT_DISPLAY = """
      SELECT users.email, users.username, users.name, users.picture
           FROM email_configs
           LEFT JOIN users ON email_configs.user_id = users.id
           WHERE email_configs.is_available = true AND email_configs.active = true
      ORDER BY users.email DESC;
      """;
  private final TursoService tursoService;

  @Override
  public Uni<Long> count() {
    return tursoService.count("user_id", COLLECTION);
  }

  @Override
  public Uni<Integer> delete(String id) {

    final var sql = DELETE.formatted(COLLECTION, SqlUtil.escape(id));

    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Boolean> exists(String id) {
    final var sql = EXISTS.formatted(COLLECTION, SqlUtil.escape(id));

    return tursoService.executeQuery(sql)
        .map(res -> {

          return res.firstRow()
              .map(row -> row.getFirst() != null)
              .orElse(false);
        });
  }


  public Uni<Optional<EmailConfig>> read(String id) {
    final var sql = READ.formatted(COLLECTION, SqlUtil.escape(id));

    return tursoService.executeQuery(sql)
        .map(TursoResponse::result)
        .map(result -> result.one(this::from));
  }

  private EmailConfig from(Row row) {

    final var file = Optional.ofNullable(row.getString("file"))
        .map(Base64.getDecoder()::decode)
        .orElse(null);

    return EmailConfig.builder()
        .userId(row.getString("user_id"))
        .file(file)
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
        .provider(IdentityProvider.valueOf(row.getString("provider")))
        .email(row.getString("email"))
        .username(row.getString("username"))
        .name(row.getString("name"))
        .picture(row.getString("picture"))
        .build();
  }

  private EmailConfigUser fromWithUser(Row row) {
    return new EmailConfigUser(userFrom(row), from(row));
  }

  private String fileEncode(byte[] file) {
    return "'%s'".formatted(Base64.getEncoder().encodeToString(file));
  }

  @Override
  public Uni<Integer> create(EmailConfig emailConfig) {

    final var params = Stream.of(
            SqlUtil.escape(emailConfig.userId()),
            fileEncode(emailConfig.file()),
            emailConfig.fileSize(),
            emailConfig.hash(),
            emailConfig.active(),
            emailConfig.isAvailable(),
            emailConfig.hasRefreshToken(),
            emailConfig.expiresIn()
        )
        .map(Objects::toString)
        .collect(Collectors.joining(","));

    final var sql = INSERT.formatted(COLLECTION, params);

    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  private String selectQuery(EmailConfigQuery query) {
    final var lastId = StringUtil.trimFilter(query.lastId());
    if (lastId == null) {
      return SELECT_FULL.formatted("", query.limit());
    }

    final var whereClause = "WHERE user_id > %s".formatted(SqlUtil.escape(lastId));

    return SELECT_FULL.formatted(whereClause, query.limit());
  }

  @Override
  public Uni<List<EmailConfigUser>> select(EmailConfigQuery query) {

    return tursoService.executeQuery(selectQuery(query))
        .map(TursoResponse::values)
        .map(rows -> SqlUtil.toList(rows, this::fromWithUser));
  }

  @Override
  public Uni<Integer> update(EmailConfig emailConfig) {

    final var sql = UPDATE.formatted(COLLECTION, fileEncode(emailConfig.file()), emailConfig.fileSize(),
        emailConfig.hash(), emailConfig.isAvailable(), emailConfig.hasRefreshToken(), emailConfig.expiresIn(),
        SqlUtil.escape(SqlUtil.formatDateSqlite(emailConfig.updatedAt())),
        SqlUtil.escape(SqlUtil.formatDateSqlite(emailConfig.lastCheckAt())),
        SqlUtil.escape(emailConfig.stacktrace()), SqlUtil.escape(emailConfig.userId())
    );

    return tursoService.executeQuery(sql)
        .map(TursoResponse::affectedRows);
  }

  @Override
  public Uni<Optional<EmailConfigTableItem>> readWithUser(String id) {

    final var sql = READ_WITH_USER.formatted(SqlUtil.escape(id));

    return tursoService.executeQuery(sql)
        .map(TursoResponse::result)
        .map(result -> result.one(this::fromWithUser).map(EmailConfigTableItem::ofItem));
  }

  @Override
  public Uni<List<EmailConfigDto>> displayList() {
    return tursoService.executeQuery(SELECT_DISPLAY)
        .map(TursoResponse::values)
        .map(rows -> SqlUtil.toList(rows, this::fromDisplay));
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
