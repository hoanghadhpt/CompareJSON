// Install lib 'npm i json-diff'
// Run: node compare.js

const fs = require('fs');
var jsonDiff = require('json-diff');
const { totalmem } = require('os');


// Read json file with promise
function readFromFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    });
}


// First, an array of promises are built.
// Each Promise reads the file, then calls resolve with the result.
// This array is passed to Promise.all(), which then calls the callback, 
// passing the array of results in the same order.
const promises = [
    readFromFile('./JSON/input.json'),
    readFromFile('./JSON/output.json')
    // ETC ...
];

Promise.all(promises)
    .then(([input,output]) => {

        // const result = output.entry.find(x => x.title === input.entry[0].title);
        const result = output.entry.find(x => x.title === input.entry[0].title);
        if(result){
            console.log('Match title: '+input.entry[0].title);
        }
        else{
            console.log('Not found title in Output.json');
        }
    }
);