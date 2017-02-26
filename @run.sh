#!/usr/bin/env bash

cd $(dirname $0)
./@build.sh
node . &&
echo "server is running"
