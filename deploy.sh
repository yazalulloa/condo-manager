DIR=$(dirname "$(readlink -f "$0")")

# ./mvnw clean package -DskipTests
# docker build -f src/main/docker/Dockerfile.jvm.native.jvm -t quarkus/code-with-quarkus .

#./mvnw clean package -DskipTests -Dnative -Dquarkus.native.container-build=true
#docker build -f src/main/docker/Dockerfile.jvm.native.native-micro -t quarkus/code-with-quarkus .
docker build -f "$DIR"/Dockerfile -t condo-manager:latest . && \
 docker compose -f "$DIR"/docker-compose.yml up -d --no-deps --build --remove-orphans && \
 docker logs -f condo-manager
