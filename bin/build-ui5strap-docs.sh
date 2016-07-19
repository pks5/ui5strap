#!/bin/bash

curDir=$(pwd)

echo Building Ui5Strap Docs...

cd "$(dirname "$0")"

npm run build-ui5strap-docs

cd $curDir

echo Building finished.

read -p "Press any key to continue ..."