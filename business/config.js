var fs = require('fs');
// Get content from file
var configContent = fs.readFileSync("config.json");
// Define to JSON type
var config = JSON.parse(configContent);

module.exports = config;