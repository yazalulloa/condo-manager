package com.yaz.core.reflection;


//import io.quarkus.runtime.annotations.RegisterForReflection;
//
//@RegisterForReflection(
//    serialization = true,
//    ignoreNested = false,
//    registerFullHierarchy = true,
//    targets = {
//        byte[].class,
//        com.fasterxml.jackson.databind.json.JsonMapper.class,
//        com.google.api.client.auth.oauth2.AuthorizationCodeFlow.class,
//        com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl.class,
//        com.google.api.client.auth.oauth2.AuthorizationCodeResponseUrl.class,
//        com.google.api.client.auth.oauth2.AuthorizationCodeTokenRequest.class,
//        com.google.api.client.auth.oauth2.AuthorizationRequestUrl.class,
//        com.google.api.client.auth.oauth2.RefreshTokenRequest.class,
//        com.google.api.client.auth.oauth2.StoredCredential.class,
//        com.google.api.client.auth.oauth2.TokenErrorResponse.class,
//        com.google.api.client.auth.oauth2.TokenRequest.class,
//        com.google.api.client.auth.oauth2.TokenResponse.class,
//        com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow.class,
//        com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl.class,
//        com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest.class,
//        com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse.class,
//        com.google.api.client.googleapis.services.AbstractGoogleClientRequest.class,
//        com.google.api.client.googleapis.services.json.AbstractGoogleJsonClientRequest.class,
//        com.google.api.client.http.GenericUrl.class,
//        com.google.api.client.http.HttpHeaders.class,
//        com.google.api.client.http.javanet.NetHttpTransport.class,
//        com.google.api.client.json.GenericJson.class,
//        com.google.api.client.json.gson.GsonFactory.class,
//        com.google.api.client.util.GenericData.class,
//        com.google.api.client.util.IOUtils.class,
//        com.google.api.client.util.store.FileDataStoreFactory.class,
//        com.google.api.services.gmail.Gmail.class,
//        com.google.api.services.gmail.GmailRequest.class,
//        com.google.api.services.gmail.model.Label.class,
//        com.google.api.services.gmail.model.LabelColor.class,
//        com.google.api.services.gmail.model.ListLabelsResponse.class,
//        com.google.api.services.gmail.model.Message.class,
//        com.yaz.persistence.repository.turso.client.ws.Listener.class,
//        com.yaz.persistence.repository.turso.client.ws.TursoResult.class,
//        com.yaz.persistence.repository.turso.client.ws.request.Batch.class,
//        com.yaz.persistence.repository.turso.client.ws.request.BatchCond.class,
//        com.yaz.persistence.repository.turso.client.ws.request.BatchReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.BatchStep.class,
//        com.yaz.persistence.repository.turso.client.ws.request.CloseCursorReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.CloseSqlReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.CloseStreamReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.DescribeReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.ExecuteReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.FetchCursorReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.GetAutocommitReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.HelloMsg.class,
//        com.yaz.persistence.repository.turso.client.ws.request.NamedArg.class,
//        com.yaz.persistence.repository.turso.client.ws.request.OpenCursorReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.OpenStreamReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.Request.class,
//        com.yaz.persistence.repository.turso.client.ws.request.RequestMsg.class,
//        com.yaz.persistence.repository.turso.client.ws.request.SequenceReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.Stmt.class,
//        com.yaz.persistence.repository.turso.client.ws.request.StoreSqlReq.class,
//        com.yaz.persistence.repository.turso.client.ws.request.Value.class,
//        com.yaz.persistence.repository.turso.client.ws.response.Col.class,
//        com.yaz.persistence.repository.turso.client.ws.response.Error.class,
//        com.yaz.persistence.repository.turso.client.ws.response.ExecuteResp.class,
//        com.yaz.persistence.repository.turso.client.ws.response.HelloRes.class,
//        com.yaz.persistence.repository.turso.client.ws.response.Response.class,
//        com.yaz.persistence.repository.turso.client.ws.response.ResponseMsg.class,
//        com.yaz.persistence.repository.turso.client.ws.response.StmtResult.class,
//        java.io.ObjectOutputStream.class,
//        java.lang.Long.class,
//        java.lang.Number.class,
//        java.lang.Object.class,
//        java.lang.Record.class,
//        java.lang.String.class,
//        java.util.HashMap.class,
//        java.util.concurrent.locks.AbstractOwnableSynchronizer.class,
//        java.util.concurrent.locks.AbstractQueuedSynchronizer.class,
//        java.util.concurrent.locks.ReentrantLock.class,
//        java.util.concurrent.locks.ReentrantReadWriteLock.class
//    })
public class NativeRegistration {

}
