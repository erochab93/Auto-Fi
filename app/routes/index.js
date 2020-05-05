const autoRoutes = require('./auto_routes');

module.exports = function(app, database) {
    /**
     * This will initialize the main server routes
     */
    autoRoutes(app, database);
}