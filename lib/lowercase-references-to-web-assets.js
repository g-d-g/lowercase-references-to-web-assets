var fs       = require('fs');
var HtmlFile = require('./html-file');

function documentIsHtmlFile (fileName) {
    return ['html', 'inc'].indexOf(fileName.split('.')[1]) > -1;
}

function forEachHtmlDocumentIn (dirName, callback) {

    fs.readdir(dirName, function (err, fileNames) {

        if (err) { console.log('ERROR:', err); }

        fileNames.forEach(function (fileName) {

        	if (documentIsHtmlFile(fileName)) {

	        	var htmlFile = new HtmlFile(dirName + '/' + fileName);
	        	callback(htmlFile);

	        }

        });

    });

}

module.exports = function (directoryName) {

	forEachHtmlDocumentIn(directoryName, function (htmlFile) {

        htmlFile.$('img').each(function (i) {
            var imgElm = htmlFile.$(this);
            imgElm.attr('src', imgElm.attr('src').toLowerCase());
            ['1401', '1001'].forEach(function (i) {
                if (imgElm.attr('data-min-width-' + i) !== undefined) {
                    imgElm.attr('data-min-width-' + i, imgElm.attr('data-min-width-' + i).toLowerCase());
                }
            });
        });
        htmlFile.save();

    });

};