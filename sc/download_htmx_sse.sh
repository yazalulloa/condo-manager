#!/bin/bash
DIR=$(dirname "$(readlink -f "$0")")
SSE_FILE="$DIR"/../src/main/resources/META-INF/resources/js/sse.js
echo "Downloading htmx SSE extension to $SSE_FILE"
curl "https://unpkg.com/htmx.org@1.9.10/dist/ext/sse.js" -o "$SSE_FILE"