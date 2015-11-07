#!/bin/bash

curDir=$(pwd)

echo Running Desktop App ...

cd "$(dirname "$0")"

npm run run-desktop

cd $curDir

read -p "Press any key to continue ..."