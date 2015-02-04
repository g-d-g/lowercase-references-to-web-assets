var fs      = require('fs');
var cheerio = require('cheerio');

var FileObj = function (pathToFile) {
	this.pathToFile = pathToFile;
	this.content    = this.load();
	this.$          = cheerio.load(this.content);
}

FileObj.prototype = {
	load: function () {
		return fs.readFileSync(this.pathToFile, 'utf8');
	},
	save: function () {
		fs.writeFile(this.pathToFile, this.$.html());
	}
};

module.exports = FileObj;