#!/usr/bin/env node
'use strict';

const tscServer = require('speedy-tsc');
const strict = process.argv.indexOf('--strict') > 0;
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const Server = require('socket.io');
const io = new Server(3980, {});
const cp = require('child_process');

const k = cp.spawn('tsc', ['-w']);

k.stdout.pipe(process.stdout);
k.stderr.pipe(process.stderr);

k.once('error', function (err) {
  console.log('error => ', err.stack || err);
});

const publicPath = path.resolve(__dirname + '/public');
const publicPathLen = publicPath.length;

const clients = [];

function getCount() {
  return ' => connection count:' + clients.length
}

io.on('connection', function (socket) {

  // only start watching when there is a connection
  // startWatching();

  clients.push(socket);
  console.log(' => new dev server connection! ' + getCount());

  socket.on('disconnect', function () {

    console.log('dev server user disconnected ' + getCount());
    clients.splice(clients.indexOf(socket), 1);

  });
});

const strm = fs.createWriteStream(__dirname + '/dev-server.log');

const watcher = chokidar.watch(__dirname + '/**/*.tsx', {
  // ignored: /\.[^tsx]$/,
  // ignored: '!**/*.tsx',
  // ignored: ['**/.git/**/*', '**/**.js', '**/.idea/**/*'],
  ignoreInitial: true
});

const tsconfig = require('./tsconfig-fe.json');
const compileFiles = tscServer(tsconfig.compilerOptions);

watcher.once('ready', function () {

  watcher.on('add', path => {

    // const sockets = io.sockets.connected;
    const sockets = clients;

    sockets.forEach(function (socket) {
      socket.emit('HOT_RELOAD_JSX', {
        event: 'add',
        path: path
      });
    });
  });

  watcher.on('change', path => {

    if (String(path).startsWith(publicPath)) {

      compileFiles([path], function (err) {

        if(err){
          console.error(err.stack || err);
        }

        path = String(path).slice(publicPathLen + 1, path.length - 4);
        const sockets = clients;

        console.log('alrighty then sending message to front-end...');

        sockets.forEach(function (socket) {
          socket.emit('HOT_RELOAD_JSX', {
            event: 'change',
            path: path
          });
        });
      });
    }

  });

  watcher.on('unlink', path => {

    const sockets = clients;

    sockets.forEach(function (socket) {
      socket.emit('HOT_RELOAD_JSX', {
        event: 'unlink',
        path: path
      });
    });

  });

});





