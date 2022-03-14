const fs = require('fs')
var pjson = require('./package.json')

fs.writeFile('./src/version.json', `{"version": "${pjson.version}"}`, err => console.error)
