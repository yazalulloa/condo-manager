package com.yaz.reflection;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection(
    serialization = true,
    ignoreNested = false,
    registerFullHierarchy = true,
    targets = {
        byte[].class,
        com.google.api.client.auth.oauth2.AuthorizationCodeFlow.class,
        com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl.class,
        com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl.class,
        com.google.api.client.auth.oauth2.AuthorizationCodeTokenRequest.class,
        com.google.api.client.auth.oauth2.AuthorizationRequestUrl.class,
        com.google.api.client.auth.oauth2.RefreshTokenRequest.class,
        com.google.api.client.auth.oauth2.StoredCredential.class,
        com.google.api.client.auth.oauth2.TokenErrorResponse.class,
        com.google.api.client.auth.oauth2.TokenRequest.class,
        com.google.api.client.auth.oauth2.TokenResponse.class,
        com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow.class,
        com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl.class,
        com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest.class,
        com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse.class,
        com.google.api.client.googleapis.services.AbstractGoogleClientRequest.class,
        com.google.api.client.googleapis.services.json.AbstractGoogleJsonClientRequest.class,
        com.google.api.client.http.GenericUrl.class,
        com.google.api.client.http.HttpHeaders.class,
        com.google.api.client.http.javanet.NetHttpTransport.class,
        com.google.api.client.json.GenericJson.class,
        com.google.api.client.json.gson.GsonFactory.class,
        com.google.api.client.util.GenericData.class,
        com.google.api.client.util.IOUtils.class,
        com.google.api.client.util.store.FileDataStoreFactory.class,
        com.google.api.services.gmail.Gmail.class,
        com.google.api.services.gmail.GmailRequest.class,
        com.google.api.services.gmail.model.Label.class,
        com.google.api.services.gmail.model.LabelColor.class,
        com.google.api.services.gmail.model.ListLabelsResponse.class,
        java.io.ObjectOutputStream.class,
        java.lang.Long.class,
        java.lang.Number.class,
        java.lang.String.class,
        java.util.HashMap.class,
        java.util.concurrent.locks.AbstractOwnableSynchronizer.class,
        java.util.concurrent.locks.AbstractQueuedSynchronizer.class,
        java.util.concurrent.locks.ReentrantLock.class,
        java.util.concurrent.locks.ReentrantReadWriteLock.class,
        com.fasterxml.jackson.databind.json.JsonMapper.class

    })
public class NativeRegistration {

}
