var fileInfo = require('./lib/ls/utils/fileInfo');
fileInfo('./.gitignore').then(data => console.log(data));
