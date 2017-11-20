#!/bin/bash

set -e

SOURCE=src
DIST=dist
DIR_SASS=scss
DIR_CSS=css
DIR_FONTS=fonts

RESOURCES=resources

export NODE_ENV=production
export CONTENTFUL_SPACE=le2r9m8siffu
export CONTENTFUL_ACCESS_TOKEN=87cc9575c510bdf64212f7f3e21181d84dc8243fdfd75bf23949375aeb519dc8
export MESSAGE_SERVICE=http://localhost:8095/message/
export PHONEBACK_SERVICE=http://localhost:8095/request/phoneback
export APPOINTMENT_SERVICE=http://localhost:8095/bbok/appointment

if [ -d "$DIST" ]; then rm -Rf $DIST; fi

npm run lint
webpack -p --bail

# RESOURCES
cp -r $SOURCE/$DIR_SASS $DIST/$DIR_CSS
cp -r $SOURCE/$DIR_FONTS $DIST/$DIR_FONTS
cp -r $RESOURCES $DIST/$RESOURCES

# SEO
cp $SOURCE/favicon.ico $DIST
cp $SOURCE/sitemap.xml $DIST
cp $SOURCE/robots.txt $DIST

echo "----------------------------------------------";
echo "             Build is successful!";
echo "----------------------------------------------";
