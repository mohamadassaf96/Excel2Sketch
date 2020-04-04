const excelData = require('../models/excelData.js')

module.exports = {
    read: function (excelFileLocation) {
        var e = new excelData("This is a title");
        return e;
    }
}