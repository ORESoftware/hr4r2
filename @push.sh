#!/usr/bin/env bash

cd $(dirname "$0")
timestamp=$(date +%s)

git add . &&
git add -A &&
git commit --allow-empty -am "set:$timestamp" &&
git push &&
echo "project pushed successfully"