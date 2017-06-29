mkdir -p drawable-hdpi drawable-ldpi drawable-mdpi drawable-xhdpi drawable-xxhdpi drawable-xxxhdpi

for i in *.png;
do 
	cp $i ./drawable-xxxhdpi 
	convert -resize 75% ./drawable-xxxhdpi/$i ./drawable-xxhdpi/$i
	convert -resize 66.667% ./drawable-xxhdpi/$i ./drawable-xhdpi/$i
	convert -resize 75% ./drawable-xhdpi/$i ./drawable-hdpi/$i
	convert -resize 66.667% ./drawable-hdpi/$i ./drawable-mdpi/$i
	convert -resize 75% ./drawable-mdpi/$i ./drawable-ldpi/$i
done
