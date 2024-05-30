DIR=$(dirname "$(readlink -f "$0")")
RES_DIR=$DIR/src/main/resources/META-INF/resources


if [ -n "$1" ]
then
  echo "Minify"
  bun --env-file=bunenv.env build --minify --target=browser --outdir="$RES_DIR"/out "$DIR"/frontend/js
else
  echo "Watching"
  bun --env-file=bunenv.env build --target=browser --outdir="$RES_DIR"/out "$DIR"/frontend/js  --watch
fi


#bun build --minify  --outdir="$RES_DIR"/out "$RES_DIR"/js  --watch
#bun build --outdir="$RES_DIR"/out "$RES_DIR"/js  --watch

