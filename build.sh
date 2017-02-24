#!/usr/bin/env bash


# if it wasn't apparent this project uses TypeScript for some static type checking
# furthermore, since RxJS is written with TS, it makes integration a bit easier
# if you don't have tsc at the command line, you will need to install TypeScript
# using npm install -g typescript


DIST=$(cd $(dirname $0) && pwd)/dist
rm -rf ${DIST}

cd $(dirname $0)

# build with typescript; use tsc --watch, to watch for changes + transpile incrementally
tsc --pretty --jsx react --project tsconfig-fe.json
tsc --pretty --jsx react --project tsconfig.json
