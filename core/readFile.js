const fs = require("fs");
const csv = require("csv-parser");

module.exports = {
    readFile(path) {
        const csvData = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(path)
                .pipe(csv({ separator: ";" }))
                .on("data", function(row) {
                    csvData.push(row);
                })
                .on("end", function() {
                    resolve(csvData);
                })
                .on("error", function(error) {
                    reject(error);
                });
        });
    }
};
