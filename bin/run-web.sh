#!/bin/bash

curDir=$(pwd)

echo Starting Http Server ...

cd "$(dirname "$0")"

npm run run-web

cd $curDir

read -p "Press any key to continue ..."