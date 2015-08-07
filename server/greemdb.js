var mongojs = require('mongojs');
var db = mongojs("greemdb", [""]);

module.exports = db;