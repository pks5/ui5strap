#!/bin/bash

curDir=$(pwd)

echo Building Ui5Strap Library...

cd "$(dirname "$0")"

npm run build-ui5strap-library

cd $curDir

echo Building finished.

read -p "Press any key to continue ..."