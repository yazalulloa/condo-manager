package com.yaz.service;

import io.quarkus.vertx.ConsumeEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.sse.OutboundSseEvent;
import jakarta.ws.rs.sse.Sse;
import jakarta.ws.rs.sse.SseEventSink;
import java.lang.ref.WeakReference;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.yaz.util.EventConstants;

@Slf4j
@ApplicationScoped
@RequiredArgsConstructor(onConstructor_ = {@Inject})
public class ServerSideEventHelper {

  private final ConcurrentHashMap<String, List<WeakReference<SseEventSink>>> sinks = new ConcurrentHashMap<>();

  private final Sse sse;

  public synchronized void addSink(String key, SseEventSink sseEventSink) {
    final var sseEventSinks = sinks.get(key);

    if (sseEventSinks != null) {
      sseEventSinks.add(new WeakReference<>(sseEventSink));
    } else {
      final var list = new ArrayList<WeakReference<SseEventSink>>();
      list.add(new WeakReference<>(sseEventSink));
      sinks.put(key, list);
    }
  }

  public synchronized void removeClosed() {

    final var enumeration = sinks.keys();
    while (enumeration.hasMoreElements()) {
      final var key = enumeration.nextElement();
      final var eventSinks = sinks.get(key);
      if (eventSinks != null && !eventSinks.isEmpty()) {
        eventSinks.removeIf(weakReference -> {

          final var sseEventSink = weakReference.get();
          return sseEventSink == null || sseEventSink.isClosed();
        });
      }
    }
  }

  private void sendSseEvent(String key, OutboundSseEvent event) {
    final var eventSinks = sinks.get(key);
    if (eventSinks != null && !eventSinks.isEmpty()) {
      eventSinks.forEach(weakReference -> {
        final var sseEventSink = weakReference.get();
        if (sseEventSink != null && !sseEventSink.isClosed()) {
          log.info("SENDING_EVENT {}", key);
          sseEventSink.send(event);
        }
      });
    }
  }

  public void sendNotification(String value) {
   /*
   OutboundSseEvent sseEvent = sse.newEventBuilder()
        .id(message.getKey())
        .mediaType(MediaType.TEXT_PLAIN_TYPE)
        .name("message")
        .data(data)
        .reconnectDelay(3000)
        .comment(message.getPayload())
        .build();
    */

    log.info("SENDING {}", value);
    final var outboundSseEvent = sse.newEvent(value, value);

    sendSseEvent(value, outboundSseEvent);

  }

  @ConsumeEvent(EventConstants.NEW_RATE)
  public void consumeNewRate(Object obj) {
    sendNotification(EventConstants.NEW_RATE);
  }
}
