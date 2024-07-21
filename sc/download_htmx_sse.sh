#!/bin/bash
DIR=$(dirname "$(readlink -f "$0")")
SSE_FILE="$DIR"/../frontend/js/sse.js
DEST="$DIR"/../src/main/resources/META-INF/resources/out/js

echo "Downloading htmx SSE extension to $SSE_FILE"
curl -L "https://unpkg.com/htmx-ext-sse@2.2.1/sse.js" -o "$SSE_FILE"
bun build "$SSE_FILE" --minify --target=browser --outfile "$DEST"/sse.js
#curl -L "https://unpkg.com/htmx.org/dist/ext/sse.js" -o "$SSE_FILE"


HTMX_FILE="$DIR"/../frontend/js/htmx.js
curl -L "https://unpkg.com/htmx.org@2.0.1" -o "$DEST"/htmx.js
#bun build "$HTMX_FILE" --minify --target=browser --outfile "$DEST"/htmx.js