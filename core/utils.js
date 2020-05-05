const Binary = require('mongodb').Binary

module.exports = {
    /**
     * 
     * @param { string } data -  Stream content to be parsed into Binary
     */
    convertBufferToBinary(data) {
        let buffer = new Buffer.from(data);
        let encodedBuffer = buffer.toString('base64');
        let binaryObject = Binary(encodedBuffer)
        return binaryObject;
    }
}