FILENAME=$1
echo $FILENAME

cp $FILENAME".png" $FILENAME"@3x.png"
cp $FILENAME".png" $FILENAME"-copy.png"
convert -resize 66.667% ./$FILENAME"-copy.png" $FILENAME"@2x.png"

convert -resize 33.333% ./$FILENAME"-copy.png" ./$FILENAME".png"

