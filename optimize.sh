#!/usr/bin/env bash


cd $(dirname $0)
rm -rf public/optimized
cd public && node ../scripts/optimize.js
cd $(dirname $0) && chmod -R 777 public/optimized