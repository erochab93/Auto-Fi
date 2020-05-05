module.exports = {
    /**
     * 
     * @param { object } csvData - CSV Content
     * @param { array } headers - CSV headers 
     * @param { array } columnNameAllow - CSV allowed columns 
     */
    processData({ csvData, headers, columnNameAllow }) {
        const newData = [];
        const DELIMITER = ";";

        headers = headers.filter(item => columnNameAllow.includes(item.toLowerCase()))

        if (headers.length != columnNameAllow.length) {
            throw Error("CSV file does not contains all required columns");
        }

        headers.join(DELIMITER);

        newData.push(headers);

        csvData.forEach((row, index) => {
            for (let column in row) {
                if (!columnNameAllow.includes(column.toLowerCase())) {
                    delete row[column];
                }
            }
            let newRow = Object.values(row).join(DELIMITER);
            newData.push(newRow);
        });

        return newData;
    }
};
