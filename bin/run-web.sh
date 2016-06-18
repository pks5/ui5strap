#!/bin/bash

curDir=$(pwd)

echo Starting Http Server ...

cd "$(dirname "$0")"

npm run run-web -- $1

cd $curDir