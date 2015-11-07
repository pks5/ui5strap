#!/bin/bash

curDir=$(pwd)

echo Building Ui5Strap base theme ...

cd "$(dirname "$0")"

cd "../tools/theme-builder/bootstrap-3.3.5"

npm run build-theme-base

cd $curDir

echo Building theme finished.

read -p "Press any key to continue ..."