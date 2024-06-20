#!/bin/bash
DIR=$(dirname "$(readlink -f "$0")")
SSE_FILE="$DIR"/../frontend/js/sse.js
echo "Downloading htmx SSE extension to $SSE_FILE"
curl -L "https://unpkg.com/htmx-ext-sse@2.0.0/sse.js" -o "$SSE_FILE"
#curl -L "https://unpkg.com/htmx.org/dist/ext/sse.js" -o "$SSE_FILE"