#!/bin/bash
echo "Enter database name"
read dbName
mongo --eval use $dbName

for D in data/json/*; do
    if [ -d "${D}" ]; then
	COL="$(basename $D)"
	echo "Importing objects to ${COL} collection"

	for F in $D/*.json; do
	    TMP=$(head -c 1 "${F}")

	    case $TMP in
		"{")
		    echo "-Importing object from ${F} ${TMP}"
		    mongoimport --db "${dbName}" --collection "${COL}" --file "${F}"
		    ;;
		"[")
		    echo "-Importing array of objects from ${F} ${TMP}"
		    mongoimport --db "${dbName}" --collection "${COL}" --file "${F}" --jsonArray
		    ;;
		*)
		    echo "-File ${F} ignored: must be json object or array"
		    ;;
	    esac
	done
    fi
done
