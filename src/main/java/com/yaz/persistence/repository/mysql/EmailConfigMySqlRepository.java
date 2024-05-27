package com.yaz.persistence.repository.mysql;

//import com.yaz.persistence.domain.EmailConfigUser;
//import com.yaz.persistence.domain.IdentityProvider;
//import com.yaz.persistence.domain.MySqlQueryRequest;
//import com.yaz.persistence.domain.query.EmailConfigQuery;
//import com.yaz.persistence.entities.EmailConfig;
//import com.yaz.api.domain.response.EmailConfigDto;
//import com.yaz.api.domain.response.EmailConfigTableItem;
//import com.yaz.core.util.SqlUtil;
//import com.yaz.core.util.StringUtil;
//import io.smallrye.mutiny.Uni;
//import io.vertx.core.buffer.Buffer;
//import io.vertx.mutiny.sqlclient.Row;
//import io.vertx.mutiny.sqlclient.RowSet;
//import io.vertx.mutiny.sqlclient.SqlResult;
//import io.vertx.mutiny.sqlclient.Tuple;
//import io.vertx.sqlclient.impl.ArrayTuple;
//import jakarta.enterprise.context.ApplicationScoped;
//import jakarta.inject.Inject;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Objects;
//import java.util.Optional;
//import java.util.stream.Stream;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
////@LookupIfProperty(name = "app.repository.impl", stringValue = "mysql")
////@Named("mysql")
//@ApplicationScoped
//@RequiredArgsConstructor(onConstructor_ = {@Inject})
//public class EmailConfigMySqlRepository {
//
//
//  private static final String COLLECTION = "email_configs";
//
//  private static final String ALL = "SELECT *, BIN_TO_UUID(user_id) as uuid_id FROM %s %s ORDER BY created_at DESC";
//
//  private static final String SELECT = "SELECT *, BIN_TO_UUID(user_id) as uuid_id FROM %s %s ORDER BY created_at DESC LIMIT ?";
//  private static final String READ = "SELECT * FROM %s WHERE user_id = ?".formatted(COLLECTION);
//  private static final String EXISTS = "SELECT BIN_TO_UUID(user_id) as uuid_id FROM %s WHERE user_id = ?".formatted(
//      COLLECTION);
//  private static final String DELETE_BY_ID = "DELETE FROM %s WHERE user_id = UUID_TO_BIN(?)".formatted(COLLECTION);
//  private static final String REPLACE = """
//      REPLACE INTO %s (user_id, file, file_size, hash, active, is_available, has_refresh_token, expires_in, created_at)
//      VALUES (UUID_TO_BIN(?), %s);
//      """.formatted(COLLECTION, SqlUtil.params(8));
//
//  private static final String SELECT_FULL = """
//      SELECT BIN_TO_UUID(email_configs.user_id) as uuid_id,email_configs.*, users.provider_id, users.provider, users.email, users.username, users.name, users.picture
//           FROM email_configs
//           LEFT JOIN users ON email_configs.user_id = users.id
//            %s
//      ORDER BY email_configs.user_id DESC LIMIT ?;
//      """;
//  private static final String READ_WITH_USER = """
//      SELECT BIN_TO_UUID(email_configs.user_id) as uuid_id,email_configs.*, users.provider_id, users.provider, users.email, users.username, users.name, users.picture
//         FROM email_configs
//         INNER JOIN users ON email_configs.user_id = users.id
//         WHERE email_configs.user_id = UUID_TO_BIN(?);
//      """;
//
//  private static final String UPDATE = """
//      UPDATE %s
//      SET file = ?, file_size = ?, hash = ?, is_available = ?, has_refresh_token = ?, expires_in = ?, updated_at = ?, last_check_at = ?, stacktrace = ?
//      WHERE user_id = UUID_TO_BIN(?);
//      """.formatted(COLLECTION);
//  private static final String SELECT_DISPLAY = """
//      SELECT BIN_TO_UUID(email_configs.user_id) as uuid_id, users.email, users.username, users.name, users.picture
//           FROM email_configs
//           LEFT JOIN users ON email_configs.user_id = users.id
//           WHERE email_configs.is_available = true AND email_configs.active = true
//      ORDER BY users.email DESC;
//      """;
//
//
//  private final MySqlService mySqlService;
//
//
//  public Uni<Long> count() {
//    return mySqlService.totalCount(COLLECTION);
//  }
//
//
//  public Uni<Integer> delete(String id) {
//    return mySqlService.request(DELETE_BY_ID, Tuple.of(id))
//        .map(SqlResult::rowCount);
//  }
//
//
//  public Uni<Boolean> exists(String id) {
//    return mySqlService.request(EXISTS, Tuple.of(id))
//        .map(RowSet::iterator)
//        .map(i -> i.hasNext() && i.next().getString("uuid_id") != null);
//  }
//
//
//  public Uni<Optional<EmailConfig>> read(String id) {
//    return mySqlService.request(READ, Tuple.of(id))
//        .map(rows -> {
//          if (rows.size() == 0) {
//            return Optional.empty();
//          }
//
//          return Optional.of(from(rows.iterator().next()));
//        });
//  }
//
//  private EmailConfig from(Row row) {
//
//    return EmailConfig.builder()
//        .id(row.getString("uuid_id"))
//        .file(row.getBuffer("file").getBytes())
//        .fileSize(row.getLong("file_size"))
//        .hash(row.getLong("hash"))
//        .active(row.getBoolean("active"))
//        .isAvailable(row.getBoolean("is_available"))
//        .hasRefreshToken(row.getBoolean("has_refresh_token"))
//        .expiresIn(row.getLong("expires_in"))
//        .createdAt(row.getLocalDateTime("created_at"))
//        .updatedAt(SqlUtil.getValue(row, "updated_at", Row::getLocalDateTime))
//        .lastCheckAt(SqlUtil.getValue(row, "last_check_at", Row::getLocalDateTime))
//        .stacktrace(SqlUtil.getValue(row, "stacktrace", Row::getString))
//        .build();
//  }
//
//
//  public Uni<Integer> create(EmailConfig emailConfig) {
//    return mySqlService.request(REPLACE, createTuple(emailConfig))
//        .map(SqlResult::rowCount);
//  }
//
//  private Tuple createTuple(EmailConfig emailConfig) {
//    final var tuple = new ArrayTuple(8)
//        .addValue(emailConfig.id())
//        .addBuffer(Buffer.buffer(emailConfig.file()))
//        .addLong(emailConfig.fileSize())
//        .addLong(emailConfig.hash())
//        .addBoolean(emailConfig.active())
//        .addBoolean(emailConfig.isAvailable())
//        .addBoolean(emailConfig.hasRefreshToken())
//        .addLong(emailConfig.expiresIn())
//        .addLocalDateTime(emailConfig.createdAt());
//
//    return Tuple.newInstance(tuple);
//  }
//
//
//  public Uni<List<EmailConfig>> all() {
//    return mySqlService.request(ALL)
//        .map(rows -> SqlUtil.toList(rows, this::from));
//  }
//
//  private MySqlQueryRequest where(EmailConfigQuery query) {
//
//    final var lastId = StringUtil.uuid(query.lastId());
//    final var user = StringUtil.trimFilter(query.user());
//
//    final var tupleSize = Stream.of(lastId, user)
//        .filter(Objects::nonNull)
//        .count();
//
//    if (tupleSize == 0) {
//      return MySqlQueryRequest.normal(SELECT_FULL.formatted(""), Tuple.of(query.limit()));
//    }
//
//    final var tuple = new ArrayTuple((int) tupleSize);
//    final var queries = new ArrayList<String>();
//
//    if (lastId != null) {
//      queries.add("user_id < UUID_TO_BIN(?)");
//      tuple.addUUID(lastId);
//    }
//
//    if (user != null) {
//      // TODO queries.add(LIKE_QUERY);
//      tuple.addString("%" + user + "%");
//    }
//
//    tuple.addInteger(query.limit());
//
//    final var queryParams = " WHERE " + String.join(SqlUtil.AND, queries);
//
//    return MySqlQueryRequest.normal(SELECT_FULL.formatted(queryParams), tuple);
//  }
//
//
//  public Uni<List<EmailConfigUser>> select(EmailConfigQuery query) {
//
//    return mySqlService.request(where(query))
//        .map(rows -> SqlUtil.toList(rows, row -> {
//
//          final var user = userFrom(row);
//
//          final var emailConfig = from(row);
//
//          return new EmailConfigUser(user, emailConfig);
//        }));
//  }
//
//  private EmailConfigUser.User userFrom(Row row) {
//    return EmailConfigUser.User.builder()
//        .providerId(row.getString("provider_id"))
//        .provider(IdentityProvider.valueOf(row.getString("provider")))
//        .email(row.getString("email"))
//        .username(row.getString("username"))
//        .name(row.getString("name"))
//        .picture(row.getString("picture"))
//        .build();
//  }
//
//
//  public Uni<Integer> update(EmailConfig emailConfig) {
//
//    final var tuple = new ArrayTuple(8)
//        .addBuffer(Buffer.buffer(emailConfig.file()))
//        .addLong(emailConfig.fileSize())
//        .addLong(emailConfig.hash())
//        .addBoolean(emailConfig.isAvailable())
//        .addBoolean(emailConfig.hasRefreshToken())
//        .addLong(emailConfig.expiresIn())
//        .addLocalDateTime(emailConfig.updatedAt())
//        .addLocalDateTime(emailConfig.lastCheckAt())
//        .addString(emailConfig.stacktrace())
//        .addValue(emailConfig.id());
//
//    return mySqlService.request(UPDATE, Tuple.newInstance(tuple))
//        .map(SqlResult::rowCount);
//
//  }
//
//
//  public Uni<Optional<EmailConfigTableItem>> readWithUser(String id) {
//
//    return mySqlService.request(READ_WITH_USER, Tuple.of(id))
//        .map(rows -> {
//          if (rows.size() == 0) {
//            return Optional.empty();
//          }
//
//          final var row = rows.iterator().next();
//
//          final var user = userFrom(row);
//
//          final var emailConfig = from(row);
//
//          return Optional.of(EmailConfigTableItem.ofItem(new EmailConfigUser(user, emailConfig)));
//        });
//  }
//
//
//  public Uni<List<EmailConfigDto>> displayList() {
//
//    return mySqlService.request(SELECT_DISPLAY)
//        .map(rows -> SqlUtil.toList(rows, row -> {
//
//          return EmailConfigDto.builder()
//              .id(row.getString("uuid_id"))
//              .email(row.getString("email"))
//              .username(row.getString("username"))
//              .name(row.getString("name"))
//              .picture(row.getString("picture"))
//              .build();
//        }));
//  }
//}
