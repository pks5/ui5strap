#!/bin/bash

curDir=$(pwd)

echo Welcome to Ui5Strap installation.

echo Installing node modules for /bin...

cd "$(dirname "$0")"

npm install

echo Installing node modules for /server...

cd ../server

npm install

echo Installing node modules for /build/ui5strap/themes...

cd ../build/ui5strap/themes

npm install

cd $curDir

echo Installation finished.

read -p "Press any key to continue ..."