#!/bin/sh
cat pre.html> ../index.html
date +%Y%m%d%H%M%S

for i in $( ls slides | sed -e 's/\.html$//' | sort -n ); do cat slides/$i.html >> ../index.html; done;

cat post.html >> ../index.html

echo 'build complete - index.html built OK.'