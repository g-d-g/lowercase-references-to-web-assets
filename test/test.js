var lowerCaser = require('../lib/lowercase-references-to-web-assets.js');
var ncp        = require('ncp').ncp;
// var async     = require('async');

function forEachFileInDir(dirName, callback) {
    fs.readdir(dirName, function (err, fileNames) {
        if (err) { console.log('ERROR:', err); }
        fileNames.forEach(function (fileName) {
            callback(dirName + '/' + fileName);
        })
    });
}

function setupTestFixturesAndThen (callback) {

    ncp('test/lowerCaseRefsSrc', 'test/lowerCaseRefs', function (err) {
        if (err) { return console.error(err); }
        console.log('copying dir');
        callback();
    });
}

function fileIsAnImage (filePath) {
    return ['jpg', 'gif', 'png'].indexOf(filePath.split('.')[1]) > -1;
}

module.exports = {
    testRenamingFiles: function (test) {
        test.expect(1);
        setupTestFixturesAndThen(function () {
            lowerCaser('lowerCaseRefs');
            forEachFileInDir('lowerCaseRefs', function (filePath) {
                if (fileIsAnImage(filePath)) {
                    test.ok(filePath === filePath.toLowerCase());
                }
            });
            test.done();
        });
    }
};