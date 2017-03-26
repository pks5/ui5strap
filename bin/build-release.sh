#!/bin/bash

echo '  __  ___ ____ ______              '
echo ' / / / (_) __// __/ /________ ____ ' 
echo '/ /_/ / /__ \_\ \/ __/ __/ _ `/ _ \'
echo '\____/_/____/___/\__/_/  \_,_/ .__/'
echo '                            /_/    '                                        

echo

curDir=$(pwd)

echo Building Ui5Strap release in docs ...

cd "$(dirname "$0")"

npm run build-release

cd $curDir

echo 

read -p "Finished. Press any key to continue or wait 10 seconds ..." -t 10
