const folders = require('./folders');
var fs = require('fs');

console.log("Start parsing...");

folders.sort( (a,b) => {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
});

console.log("End parsing");

fs.writeFile('sorted-folders.json', JSON.stringify(folders), (err) => {
    if (err) throw err;
    console.log("Json file has been created");
});