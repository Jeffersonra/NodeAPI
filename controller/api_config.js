const neo4j = require("neo4j-driver").v1;

exports.neo4j_driver = {};
exports.neo4j_driver.url_bold = 'bolt://localhost:7687';
exports.neo4j_driver.auth = neo4j.default.auth.basic('test','1234');