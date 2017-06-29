for i in *.png;
do
    filename=$(basename "$i")
    #extension=="${filename##*.}"
    filename="${filename%.*}"

    cp $filename".png" $filename"@3x.png"
    #cp $FILENAME".png" $FILENAME"-copy.png"
    convert -resize 66.667% ./$filename".png" $filename"@2x.png"

    convert -resize 33.333% ./$filename".png" ./$filename".png"
done
