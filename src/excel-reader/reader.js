const excelDataModel = require('../models/excelData.js');
module.exports = {
    read: function (filePath) {
        const xlsx = require('xlsx');
        console.log("Reading from Xlsx file location: " + filePath);
        var workbook = xlsx.readFile(filePath);
        var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
        var jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]],{defval:null, header:1});
        var excelData = new excelDataModel(sheet_name_list[0], jsonData);
        return excelData;
    }
}