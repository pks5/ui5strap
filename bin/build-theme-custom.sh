#!/bin/bash

cd "$(dirname "$0")"

cd "../tools/theme-builder/bootstrap-3.3.5"

npm run build-theme-custom -- --ui5strap-theme=$1

cd $PWD