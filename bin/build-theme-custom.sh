#!/bin/bash

curDir=$(pwd)

echo Building custom theme $theme ...

cd "$(dirname "$0")"

cd "../tools/theme-builder/bootstrap-3.3.5"

theme=$1

if [ -z "$theme" ]
  then
    read -p "Theme Name: " theme
fi

if [ -z "$theme" ]
  then
  	  theme=ui5strap_default
fi

echo "Building Theme: $theme"

npm run build-theme-custom -- --ui5strap-theme=$theme

cd $curDir

echo Building theme finished.

read -p "Press any key to continue ..."