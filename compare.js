// Install lib 'npm i json-diff'
// Run: node compare.js

const fs = require('fs');
var jsonDiff = require('json-diff');


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

        // Load each entry of input
        input.forEach(item => {
            //Find title in output file
            const index = output.findIndex(x=> x.title === item.title);
            if(index >= 0){
            // Compare 2 object
            console.log('Compare: tile = '+item.title);
            const compare = jsonDiff.diffString(item,output[index]);
            if(compare.includes('{')){
                console.log('Not match.\n\t(-) Input file\n\t(+) Ouput file');
                console.log(compare);
            }
            else {
                console.log('\t==> Matched');
            }
        }
        else{
            console.log('Compare: tile = '+item.title);
            console.log('\t==> Not found on Output.json file.');
        }
        });
        
    }
);