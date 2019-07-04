var fs = require('fs');
var http = require('http');

function getEntries(){
    var entries = [];
    var entriesRaw = fs.readFileSync('./entries.txt','ut')
}