package com.yaz.service;

import com.yaz.persistence.entities.TelegramChat;
import com.yaz.persistence.repository.turso.TelegramChatRepository;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class TelegramChatService {

  private final TelegramChatRepository repository;

  public Uni<Integer> deleteByUser(String userId) {
    return repository.deleteByUser(userId);
  }

  public Uni<Integer> delete(String userId, long chatId) {
    return repository.delete(userId, chatId);
  }

  public Uni<Integer> save(TelegramChat chat) {
    return repository.save(chat);
  }

  public Uni<Optional<TelegramChat>> read(String userId, long chatId) {
    return repository.read(userId, chatId);
  }

  public Uni<Boolean> exists(String userId, long chatId) {
    return repository.exists(userId, chatId);
  }

  public Uni<Integer> update(TelegramChat telegramChat) {
    return repository.update(telegramChat);
  }
}
