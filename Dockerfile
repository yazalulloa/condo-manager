FROM quay.io/quarkus/ubi-quarkus-graalvmce-builder-image:jdk-21.0.1 AS build

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 ./mvnw verify --fail-never -DskipTests

COPY local.env .env
COPY src ./src
USER root
RUN source ./.env
RUN --mount=type=cache,target=/root/.m2 ./mvnw clean package -DskipTests -Dnative

FROM registry.access.redhat.com/ubi8/ubi-minimal:8.8
WORKDIR /work/
COPY --from=build /project/target/*-runner /work/application
COPY local.env .env
RUN chmod 775 /work

EXPOSE 13835

ENTRYPOINT ["./application", "-Dquarkus.http.host=0.0.0.0"]