const excelDataModel = require('../models/excelData.js');
module.exports = {
    read: function (filePath) {
        const xlsx = require('xlsx');
        console.log("Reading from Xlsx file location: " + filePath);
        var workbook = xlsx.readFile(filePath);
        var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
        var data = [];
        sheet_name_list.forEach(function(y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            for(z in worksheet) {
                if(z[0] === '!') continue;
                //parse out the column, row, and value
                var tt = 0;
                for (var i = 0; i < z.length; i++) {
                    if (!isNaN(z[i])) {
                        tt = i;
                        break;
                    }
                };
                var col = z.substring(0,tt);
                var row = parseInt(z.substring(tt));
                var value = worksheet[z].v;

                //store header names
                if(row == 1 && value) {
                    headers[col] = value;
                    continue;
                }

                if(!data[row]) data[row]={};
                data[row][headers[col]] = value;
            }
        });
        var excelData = new excelDataModel(sheet_name_list[0], data);
        return excelData;
    }
}