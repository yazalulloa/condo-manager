#!/bin/bash
DIR=$(dirname "$(readlink -f "$0")")

"$DIR"/../mvnw clean package -DskipTests
java -agentlib:native-image-agent=config-output-dir="$DIR"/../native-config/native-image -jar "$DIR"/../target/quarkus-app/quarkus-run.jar