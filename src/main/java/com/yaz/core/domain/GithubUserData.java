package com.yaz.core.domain;

import lombok.Builder;

@Builder(toBuilder = true)
public record GithubUserData(
    long id,
    String login,
    String name,
    String email,
    String nodeId,
    String avatarUrl,
    String url,

    String aud,
    long iat,
    long exp,
    String jti

) {

}
