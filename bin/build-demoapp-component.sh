#!/bin/bash

curDir=$(pwd)

echo Building Demoapp Component...

cd "$(dirname "$0")"

npm run build-demoapp-component

cd $curDir

echo Building finished.

read -p "Press any key to continue ..."