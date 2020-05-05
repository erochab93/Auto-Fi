const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
const { processFile } = require('../../business/processFile');
const { saveAuto } = require('../../business/auto_service');


module.exports = function(app, database) {
    /**
     * This route will handle the upload of CSV file
     */
    app.post('/api/upload/:providerName', upload.single('csv'), async (req, res, next) => {
        try {
            data = await processFile(req, res);
            result = await saveAuto(data, database, res)
            
        } catch(err) {
            next(err);
        }
    });

    /**
     * This interceptor will catch not found routes and return a 404 error code
     */
    app.use((req, res, next) => {
        res.status(404).json({ error: 'Not found'})
    })


    /**
     * This interceptor will catch execption and return a 505 error code
     */
    app.use((err, req, res, next) => {
        res.status(500).json({ error: err.message  })
    })
};
