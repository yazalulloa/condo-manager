package com.yaz.core.domain;

import com.yaz.core.github.UserEmail;
import java.util.List;
import lombok.Builder;

@Builder(toBuilder = true)
public record GithubUserData(
    long id,
    String login,
    String name,
    String email,
    List<UserEmail> emails,
    String nodeId,
    String avatarUrl,
    String url,

    String aud,
    long iat,
    long exp,
    String jti

) {

}
