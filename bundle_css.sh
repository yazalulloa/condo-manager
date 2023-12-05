DIR=$(dirname "$(readlink -f "$0")")
RES_DIR=$DIR/src/main/resources/META-INF/resources

# bun tailwindcss -i "$RES_DIR"/css/styles.css -o "$RES_DIR"/out/css/output.css --minify
#bun tailwindcss -i "$RES_DIR"/css/styles.css -o "$RES_DIR"/out/css/output.css --minify --watch
bun tailwindcss -i "$RES_DIR"/css/styles.css -o "$RES_DIR"/out/css/output.css --watch