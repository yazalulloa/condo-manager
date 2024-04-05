package com.yaz.api.msg;

import io.quarkus.qute.i18n.Message;
import io.quarkus.qute.i18n.MessageBundle;

@MessageBundle
public interface ApartmentMessages {

  @Message
  String error_msg_apt_email_invalid();

  @Message
  String error_msg_apt_number_invalid();

  @Message
  String error_msg_apt_number_exists();

  @Message
  String error_msg_apt_aliquot_invalid();

  @Message
  String error_msg_apt_building_does_not_exist();

  @Message
  String error_msg_apt_building_invalid();

  @Message
  String error_msg_apt_name_invalid();

  @Message
  String error_msg_apt_no_change();
}
