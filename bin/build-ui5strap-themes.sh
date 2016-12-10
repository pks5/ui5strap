#!/bin/bash

curDir=$(pwd)

echo Building Ui5Strap Themes...

cd "$(dirname "$0")"

npm run build-ui5strap-themes

cd $curDir

echo Building finished.

read -p "Press any key to continue ..."
