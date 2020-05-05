/**
 * This service module will handle main operations for car collection
 */
const utils = require('../core/utils');

module.exports = {
    /**
     * 
     * @param { array } data 
     * @param { mongoClient } database 
     * @param { HttpResponse } res 
     */
    async saveAuto(data, database, res) {
        let newData = { file_data: utils.convertBufferToBinary(data) };
        
        database.collection("cars").insertOne(newData, (err, data) => {
            if (err) {
                throw new Error('An error has ocurred.');
            } else {
                console.log('Entry saved succesfully');
                res.send(data.ops[0]);
            }
        })
    }
} 