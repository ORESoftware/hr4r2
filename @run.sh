#!/usr/bin/env bash

cd $(dirname $0)
./@transpile.sh
node . &&
echo "server is running"
