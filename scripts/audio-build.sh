#!/bin/zsh
# Turns each narration text into a small AAC file. Uses the Mac's built-in voice
# for now; replace the `say` line with any TTS you like and re-run.
SRC=$1; OUT=$2; VOICE=${3:-Samantha}
for t in $SRC/*.txt; do
  id=$(basename $t .txt)
  [ -s "$OUT/$id.m4a" ] && continue
  say -v "$VOICE" -r 172 -f "$t" -o "/tmp/$id.aiff" && \
  ffmpeg -loglevel error -y -i "/tmp/$id.aiff" -ac 1 -ar 24000 -c:a aac -b:a 40k "$OUT/$id.m4a" && rm -f "/tmp/$id.aiff"
  echo "$id $(du -k "$OUT/$id.m4a" | cut -f1)KB"
done
echo "done: $(ls $OUT/*.m4a | wc -l | tr -d ' ') files, $(du -sh $OUT | cut -f1)"
