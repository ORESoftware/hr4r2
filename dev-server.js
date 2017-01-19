'use strict';


const chokidar = require('chokidar');
const fs = require('fs');
const cp = require('child_process');

const Server = require('socket.io');
const io = new Server(3980, {});


const clients = [];

function getCount() {
    return ' => connection count:' + clients.length
}

io.on('connection', function (socket) {

    // only start watching when there is a connection
    startWatching();

    clients.push(socket);
    console.log(' => new dev server connection! ' + getCount());

    socket.on('disconnect', function () {

        console.log('dev server user disconnected ' + getCount());
        clients.splice(clients.indexOf(socket), 1);

    });
});


const strm = fs.createWriteStream(__dirname + '/dev-server.log');


const watcher = chokidar.watch(__dirname, {
    // ignored: /\.[^tsx]$/,
    ignored: ['**/.git/**/*','**/**.js','**/.idea/**/*'],
    ignoreInitial: true
});


function runTSC(path, cb) {

    const shell = cp.spawn('bash');

    let stderr = '';
    let stdout = '';

    shell.once('close', function (code) {

        shell.unref();

        if (code < 1) {
            cb(null)
        }
        else {
            console.error(' => stderr from tsc child process => \n' + stderr);
        }
    });

    console.log('path => ', String(path).trim());

    shell.stderr.setEncoding('utf8');
    shell.stdout.setEncoding('utf8');

    shell.stderr.on('data', function (d) {
        stderr += d;
    });

    shell.stdout.pipe(process.stdout);

    shell.stdin.write('tsc --jsx react --module amd --target es5 ' + path + '\n');
    shell.stdin.end();

}

let callable = true;

startWatching();

function startWatching(){

    if(!callable){
        return;
    }

    callable = false;

    watcher
        .on('add', path => {

            // const sockets = io.sockets.connected;
            const sockets = clients;

            sockets.forEach(function (socket) {
                socket.send({
                    event: 'add',
                    path: path
                });
            });
        })


        .on('change', path => {

            runTSC(path, function(){

                const sockets = clients;

                sockets.forEach(function (socket) {
                    socket.send('HOT_RELOAD_JSX', JSON.stringify({
                        event: 'change',
                        path: path
                    }));
                });
            });

        })

        .on('unlink', path => {

            const sockets = clients;

            sockets.forEach(function (socket) {
                socket.send({
                    event: 'unlink',
                    path: path
                });
            });

        });

}

