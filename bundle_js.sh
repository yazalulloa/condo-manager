DIR=$(dirname "$(readlink -f "$0")")
RES_DIR=$DIR/src/main/resources/META-INF/resources

if [ -n "$1" ]
then
  echo "Minify"
  bunx build --minify  --outdir="$RES_DIR"/out "$RES_DIR"/js
else
  echo "Watching"
  bunx build --outdir="$RES_DIR"/out "$RES_DIR"/js  --watch
fi


#bun build --minify  --outdir="$RES_DIR"/out "$RES_DIR"/js  --watch
#bun build --outdir="$RES_DIR"/out "$RES_DIR"/js  --watch

