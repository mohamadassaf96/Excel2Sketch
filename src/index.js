/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

const distFolder = './dist';
const fs = require('fs-extra');
const excelReader = require('./excel-reader/reader');

const sketch = require('./builders/sketch/sketch')

// Output directory
let destination = fs.ensureDirSync(distFolder);
if (destination != null){
    console.log("Destination was created: " + destination)
}

let excelData = excelReader.read('./src/data/test.xlsx');
console.log("Data retrieved from xlsx");
console.log(excelData);
// Build the sketch file
sketch.build(distFolder, excelData);
