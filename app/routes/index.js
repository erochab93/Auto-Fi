const autoRoutes = require('./auto_routes');

module.exports = function(app, db) {
    autoRoutes(app, db);
}