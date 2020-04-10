const distFolder = './dist';
const fs = require('fs-extra');
const excelReader = require('./excel-reader/reader');

const sketch = require('./builders/sketch/sketchBuilder')

// Output directory
let destination = fs.ensureDirSync(distFolder);
if (destination != null){
    console.log("Destination was created: " + destination)
}

let excelData = excelReader.read('./data/test.xlsx');
console.log("Data retrieved from xlsx");
sketch.rowBuilder(distFolder, excelData);
