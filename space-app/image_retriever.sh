#!/bin/bash
# v7  (modified for repository)

# This script retrieves and processes the necessary images, and deletes those older than a specified range.
# Incoming jpg's below/over a certain size threshhold are deleted (some come in blank/off-center). 
# Images are currently processed at 2048x2048, then resized for display at 1024x1024. Archiving at 2k is a separate process.
# If all wavelengths don't download at given time, the whole batch is thrown out. This keeps the final animation sync'd.
# Cron format is the following: 00,30 *    * * *   user "path.sh"
# Relative paths are in use. Script is portable by modifying folder on line 18
# dependancies: imagemagick, wget. 
# works fully on ubuntu 16.04 & 18.04. untested on newer verions
# put overlays in their own overlay folder (see makdir below)

# The following lines create the date template. Keep this first in the pipeline so that the date always prints on the hour/half-hour. 
# ***TIME PRINTING IS CURRENTLY DISABLED***

# uncomment the following to create necessary folders
#makdir -p /home/repository
#makdir -p /home/repository/swv/download/aia171
#makdir -p /home/repository/swv/download/aia193
#makdir -p /home/repository/swv/download/aia211
#makdir -p /home/repository/swv/download/aia304
#makdir -p /home/repository/swv/processing/aia171
#makdir -p /home/repository/swv/processing/aia193
#makdir -p /home/repository/swv/processing/aia211
#makdir -p /home/repository/swv/processing/aia304
#makdir -p /home/repository/swv/overlay
#makdir -p /home/repository/swv/daily
#makdir -p /home/repository/swv/archive

cd "/home/repository/"

convert -size 2048x2048 xc:transparent -font Liberation-Sans -pointsize 54 -fill "#efe9e4" -gravity North \
-annotate +0+1955 "$(date "+%^B %e, %Y")" "./swv/overlay/date.png"
# use the following date string to include time-of-day: "$(date "+%^B %e, %Y %l:%M %p")"

sleep 1

# Retrieve AIA_171 image
wget --output-document="./swv/download/aia171/latest.jpg" https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0171.jpg
# Retrieve AIA_193 image
wget --output-document="./swv/download/aia193/latest.jpg" https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0193.jpg
# Retrieve AIA_211 image
wget --output-document="./swv/download/aia211/latest.jpg" https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0211.jpg
# Retrieve AIA_304 image
wget --output-document="./swv/download/aia304/latest.jpg" https://sdo.gsfc.nasa.gov/assets/img/latest/latest_2048_0304.jpg

sleep 1

# The following lines delete images below/over specified size threshold. Sizes are tuned for each image group. 
# Modify sizes if downloading images other than 2048x2048.

find "./swv/download/aia171/" -name "*.jpg" -size -530k -delete
find "./swv/download/aia193/" -name "*.jpg" -size -430k -delete
find "./swv/download/aia211/" -name "*.jpg" -size -517k -delete 
find "./swv/download/aia304/" -name "*.jpg" -size -700k -delete

sleep 1

find "./swv/download/aia171/" -name "*.jpg" -size +1000k -delete
find "./swv/download/aia193/" -name "*.jpg" -size +1000k -delete
find "./swv/download/aia211/" -name "*.jpg" -size +1000k -delete 
find "./swv/download/aia304/" -name "*.jpg" -size +1000k -delete

sleep 1

# The following lines add masks and date to images and output to temporary file. The temp file is then downsampled and compressed to
# approx 300kb-400kb jpg. BMP file is to eliminate another compression step in the pipeline. The following steps are performed ONLY 
# if all 4 files have sucessfully downloaded and passed the size threshold test. An entry is written to the error log if this process
# is not performed.

if [ -s "./swv/download/aia171/latest.jpg" ] && [ -s "./swv/download/aia193/latest.jpg" ] && \
	[ -s "./swv/download/aia211/latest.jpg" ] && [ -s "./swv/download/aia304/latest.jpg" ];

then
		convert -layers merge "./swv/download/aia171/latest.jpg" \
		"./swv/overlay/aia171-mask.png" "./swv/overlay/date.png" \
		"./swv/processing/aia171/temp.bmp"
sleep 1
		convert "./swv/processing/aia171/temp.bmp" -filter Lanczos -resize 50% -quality 96 \
		"./swv/daily/aia171/`date +%Y%m%d_%H%M`.jpg"
sleep 1
		convert -layers merge "./swv/download/aia193/latest.jpg" \
		"./swv/overlay/aia193-mask.png" "./swv/overlay/date.png" \
		"./swv/processing/aia193/temp.bmp"
sleep 1
		convert "./swv/processing/aia193/temp.bmp" -filter Lanczos -resize 50% -quality 96 \
		"./swv/daily/aia193/`date +%Y%m%d_%H%M`.jpg"
sleep 1
		convert -layers merge "./swv/download/aia211/latest.jpg" \
		"./swv/overlay/aia211-mask.png" "./swv/overlay/date.png" \
		"./swv/processing/aia211/temp.bmp"
sleep 1
		convert "./swv/processing/aia211/temp.bmp" -filter Lanczos -resize 50% -quality 96 \
		"./swv/daily/aia211/`date +%Y%m%d_%H%M`.jpg"
sleep 1
		convert -layers merge "./swv/download/aia304/latest.jpg" \
		"./swv/overlay/aia304-mask.png" "./swv/overlay/date.png" \
		"./swv/processing/aia304/temp.bmp"
sleep 1
		convert "./swv/processing/aia304/temp.bmp" -filter Lanczos -resize 50% -quality 96 \
		"./swv/daily/aia304/`date +%Y%m%d_%H%M`.jpg" 
sleep 1

else
		echo `date +%Y%m%d_%H%M` >> "./swv/error_log.txt"
fi

sleep 1

# 2k processing for archive. Actions are the same as above minus the resize switch

if [ -s "./swv/download/aia171/latest.jpg" ] && [ -s "./swv/download/aia193/latest.jpg" ] && \
	[ -s "./swv/download/aia211/latest.jpg" ] && [ -s "./swv/download/aia304/latest.jpg" ];

then
		convert -layers merge -quality 95 "./swv/download/aia171/latest.jpg" \
		"./swv/overlay/aia171-mask.png" "./swv/overlay/date.png" \
		"./swv/archive/aia171/`date +%Y%m%d_%H%M`.jpg"
sleep 1
		convert -layers merge -quality 95 "./swv/download/aia193/latest.jpg" \
		"./swv/overlay/aia193-mask.png" "./swv/overlay/date.png" \
		"./swv/archive/aia193/`date +%Y%m%d_%H%M`.jpg"
sleep 1
		convert -layers merge -quality 95 "./swv/download/aia211/latest.jpg" \
		"./swv/overlay/aia211-mask.png" "./swv/overlay/date.png" \
		"./swv/archive/aia211/`date +%Y%m%d_%H%M`.jpg"
sleep 1
		convert -layers merge -quality 95 "./swv/download/aia304/latest.jpg" \
		"./swv/overlay/aia304-mask.png" "./swv/overlay/date.png" \
		"./swv/archive/aia304/`date +%Y%m%d_%H%M`.jpg"
sleep 1
		 
fi

# The following clears the download/processing folders and the date template

find "./swv/download/" -name "*.jpg" -delete
find "./swv/processing/" -name "*.bmp" -delete
find "./swv/overlay/date.png" -delete
sleep 1

# The following lines maintain a 31 day image set in the daily folder and a 367 day set in the archive folder

find "./swv/daily/aia171/" -name "*.jpg" -mtime +30 -delete
find "./swv/daily/aia193/" -name "*.jpg" -mtime +30 -delete
find "./swv/daily/aia211/" -name "*.jpg" -mtime +30 -delete 
find "./swv/daily/aia304/" -name "*.jpg" -mtime +30 -delete

find "./swv/archive/aia171/" -name "*.jpg" -mtime +367 -delete
find "./swv/archive/aia193/" -name "*.jpg" -mtime +367 -delete
find "./swv/archive/aia211/" -name "*.jpg" -mtime +367 -delete 
find "./swv/archive/aia304/" -name "*.jpg" -mtime +367 -delete

# Image Processing Complete.

exit 0
