#!/bin/bash

cd "$(dirname "$0")"

cd "../tools/theme-builder/bootstrap-3.3.5"

npm run build-theme-base

cd $PWD