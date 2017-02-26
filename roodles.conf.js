const path = require('path');

module.exports = {
  exec: 'bin/www.js',
  exclude: [path.resolve(__dirname + '/node_modules/.*'), '.git', 'test', 'public','.idea']
};