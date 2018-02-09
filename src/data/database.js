var config = require('config');
var dbConfig = config.get('dbConfig');
var monkURL = dbConfig.host + '/' + dbConfig.dbName;
const db = require('monk')(monkURL);
const pages = db.get('pages');

module.exports = {

    getDb: function () {
        return db;
    },

    getPage: function (language, route, callback) {
        pages.findOne({lang: language, route: route}).then(function (value) {
            callback(value);
        });

    }

};