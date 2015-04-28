#!/bin/bash

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
http-server -a localhost -p 8282 "$DIR/../www"
