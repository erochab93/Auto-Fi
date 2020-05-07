/**
 * This module will handle the conversion of the CSV file
 */

const { isEqual } = require('lodash');
const { readFile } = require('../core/readFile');
const { processData } = require('../core/processData');
const validation = require('../core/validation');

module.exports = {
    /**
     * 
     * @param { HttpRequest } req 
     * @param { HttpResponse } res 
     */
    async processFile(req, res) {
        const { params: { providerName = null }, file = {} } = req;
        const { path = null } = file;
        console.log('provider name :', providerName);

        const { isValid, errors } = validation({
            providerName,
            file
        });

        if (!isValid) {
            return res.status(400).json(errors);
        }

        let csvData = [];
        const columnNameAllow = [
            'uuid',
            'vin',
            'make',
            'model',
            'mileage',
            'year',
            'price',
            'zip code',
            'create date',
            'update date'];

        let newData = {
            provider: providerName,
            data: []
        };

        try {
            csvData = await readFile(path);

            if (!csvData) {
                return;
            }
    
            let headers = Object.keys(csvData[0])
    
            if (isEqual(headers, columnNameAllow)) {
                newData.data = csvData;
            } else {
                newData.data = processData({ csvData, headers, columnNameAllow });
            }

            if (!newData) {
                throw new Err('An error has ocurred.');
            }
    
            return newData;
        }
        catch (error) {
            console.log('Error reading the file: ', error);
            res.status(400).json({
                messsage: 'Error reading the file: ' + error
            });
        }

    }
}