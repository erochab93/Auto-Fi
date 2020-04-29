const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' })
const Binary = require('mongodb').Binary
const { processFile } = require('../../business/processFile');

module.exports = function(app, db) {
    app.post('/api/upload/:providerName', upload.single('csv'), async (req, res) => {
        try {
            result = await processFile(req, res);
            if (!result) {
                res.send({'error': 'An error has ocurred.'});
            }
    
            let buffer = new Buffer.from(result);
            let encodedBuffer = buffer.toString('base64');
            let insert_data = {};
            insert_data.file_data = Binary(encodedBuffer);
    
            db.collection("cars").insertOne(insert_data, (err, result) => {
                if (err) {
                    res.send({'error': 'An error has ocurred.'});
                } else {
                    console.log('Entry saved succesfully');
                    res.send(result.ops[0]);
                }
            });
        } catch(err) {
            res.send(err.message);
        }
    });
};
