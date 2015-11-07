#!/bin/bash

echo Installing node modules for bin...

cd "$(dirname "$0")"

npm install

echo Installing node modules for theme-builder...

cd ../tools/theme-builder/bootstrap-3.3.5

npm install

cd $PWD

echo Ui5Strap installation finished.