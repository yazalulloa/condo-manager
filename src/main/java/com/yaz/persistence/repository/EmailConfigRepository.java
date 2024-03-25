package com.yaz.persistence.repository;

import com.yaz.persistence.domain.EmailConfigUser;
import com.yaz.persistence.domain.query.EmailConfigQuery;
import com.yaz.persistence.entities.EmailConfig;
import com.yaz.resource.domain.response.EmailConfigDto;
import com.yaz.resource.domain.response.EmailConfigTableItem;
import io.smallrye.mutiny.Uni;
import java.util.List;
import java.util.Optional;

public interface EmailConfigRepository {

  Uni<Long> count();

  Uni<Integer> delete(String id);

  Uni<Boolean> exists(String id);

  Uni<Integer> create(EmailConfig emailConfig);

  Uni<List<EmailConfigUser>> select(EmailConfigQuery query);

  Uni<Integer> update(EmailConfig emailConfig);

  Uni<Optional<EmailConfigTableItem>> readWithUser(String id);

  Uni<Optional<EmailConfig>> read(String userId);
  Uni<List<EmailConfigDto>> displayList();

  Uni<Optional<byte[]>>getFile(String userId);

  Uni<Integer> updateLastCheck(String userId, boolean hasRefreshToken, Long expiresIn);
}
