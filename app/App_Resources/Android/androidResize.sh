mkdir -p drawable-hdpi drawable-ldpi drawable-mdpi drawable-xhdpi drawable-xxhdpi drawable-xxxhdpi
FILENAME=$1
echo $FILENAME 

cp $FILENAME ./drawable-xxxhdpi 
convert -resize 75% ./drawable-xxxhdpi/$FILENAME ./drawable-xxhdpi/$FILENAME

convert -resize 66.667% ./drawable-xxhdpi/$FILENAME ./drawable-xhdpi/$FILENAME

convert -resize 75% ./drawable-xhdpi/$FILENAME ./drawable-hdpi/$FILENAME

convert -resize 66.667% ./drawable-hdpi/$FILENAME ./drawable-mdpi/$FILENAME

convert -resize 75% ./drawable-mdpi/$FILENAME ./drawable-ldpi/$FILENAME



