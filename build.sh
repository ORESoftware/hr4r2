#!/usr/bin/env bash


# if it wasn't apparent this project uses TypeScript for some static type checking
# furthermore, since RxJS is written with TS, it makes integration a bit easier
# if you don't have tsc at the command line, you will need to install TypeScript
# using npm install -g typescript


DIST=$(cd $(dirname $0) && pwd)/dist
rm -rf ${DIST}

# build with typescript; use tsc --watch, to watch for changes + transpile incrementally
cd $(dirname $0) && tsc --jsx react --project tsconfig-fe.json
cd $(dirname $0) && tsc --jsx react --project tsconfig.json
