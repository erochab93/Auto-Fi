module.exports = {
    getUrl(mongoServer) {
        return mongoServer.getConnectionString();
    }
}

