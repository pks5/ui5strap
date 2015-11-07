#!/bin/bash

curDir=$(pwd)

echo Running Android App ...

cd "$(dirname "$0")"

npm run run-android

cd $curDir

read -p "Press any key to continue ..."