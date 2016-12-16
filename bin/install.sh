#!/bin/bash

echo '  __  ___ ____ ______              '
echo ' / / / (_) __// __/ /________ ____ ' 
echo '/ /_/ / /__ \_\ \/ __/ __/ _ `/ _ \'
echo '\____/_/____/___/\__/_/  \_,_/ .__/'
echo '                            /_/    '                                        

echo

curDir=$(pwd)

echo Welcome to Ui5Strap installation.

echo

echo Installing node modules for /bin ...

cd "$(dirname "$0")"

npm install

echo

echo Installing node modules for /server ...

cd ../server

npm install

echo

echo Installing node modules for /build/pks.ui5strap ...

cd ../build/pks.ui5strap

npm install

cd $curDir

echo

read -p "Finished. Press any key to continue or wait 10 seconds ..." -t 10
