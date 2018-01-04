const _fs = require('fs');
var config = require('./config');
var AccGenBusiness = {
    
    createFolderIfNotExists: function (folderPath) {
        //var _fs = require('fs');
        if (_fs.existsSync(folderPath)) return null;
        var _err = _fs.mkdirSync(folderPath);
        return _err;
    },
    
    savefile: function (fromFilePath, toFilePath) {
        //var _fs = require('fs');
        var _fromFileContent = _fs.readFileSync(fromFilePath);
        _fs.writeFileSync(toFilePath, _fromFileContent);
        var _err = _fs.unlinkSync(fromFilePath);
        return _err;
    },
    
    removeFilesFromPath: function (paths) {
        //var _fs = require('fs');
        var err;
        for (var i = 0; i < paths.length; i++) {
            if (_fs.existsSync(paths[i])) {
                err = _fs.unlinkSync(paths[i]);
                if (err) {
                    console.log(err);
                }
            }
        };
    },
    
    removeFilesFromDirectory: function (pathDir) {
        //var _fs = require('fs');
        if (_fs.existsSync(pathDir)) {
            var _path = require('path');
            _fs.readdir(pathDir, function (err, files) {
                for (var i = 0; i < files.length; i++) {
                    var currentPath = _path.join(pathDir, files[i]);
                    if (_fs.existsSync(currentPath)) {
                        err = _fs.unlinkSync(currentPath);
                        if (err) {
                            console.log(err);
                        }
                    }
                };
            });
        }
    },
    
    removeFolderRecursive : function (path) {
        //var _fs = require('fs');
        
        if (_fs.existsSync(path)) {
            _fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (_fs.lstatSync(curPath).isDirectory()) { // recurse
                    AccGenBusiness.removeFolderRecursive(curPath);
                } else { // delete file
                    _fs.unlinkSync(curPath);
                }
            });
            _fs.rmdirSync(path);
        }
    },
    //},
    
    success: function (res, obj) {
        res.status(200);
        var result = {
            success: true
        };
        
        if (obj) {
            result.data = obj;
        }
        
        res.json(result);
    },
    
    error: function (res, obj) {
        res.status(500);
        var result = {
            success: false
        };
        
        if (obj) {
            result.data = obj;
        }
        
        res.json(result);
    },
    
    strFormat: function () {
        var args = arguments;
        if (typeof (args[0]) === 'undefined') {
            throw "Error - first argument must not be null";
        }
        
        return args[0].replace(/{(\d+)}/g, function (match, number) {
            var index = parseInt(number, 0) + 1;
            return (typeof args[index] !== 'undefined') ? args[index] : match;
        });
    },
    
    base64_encode : function (file) {
        // convert binary data to base64 encoded string
        return new Buffer(file).toString('base64');
    },
    
    getSVGBase64FromDirectory: function (folderPath) {
        var svgs = [];
        //var _fs = require('fs');
        if (_fs.existsSync(folderPath)) {
            var _files = _fs.readdirSync(folderPath);
            for (var i = 0; i < _files.length; i++) {
                // read binary data
                var bitmap = _fs.readFileSync(folderPath + '/' + _files[i]);
                svgs.push({ name: _files[i], base64: this.base64_encode(bitmap) });
            };
        }
        return svgs;
    },
    checkFolderSize: function (path) {
        //var _fs = require('fs');
        if (config.svgFolderLimit && config.svgFolderLimit > 0) {
            if (_fs.existsSync(path)) {
                var total = 0;
                var files = _fs.readdirSync(path);
                for (var i = 0; i < files.length; i++) {
                    total += this.getFilesizeInBytes(path + "/" + files[i]);
                };
                
                if (config.svgFolderLimit <= total) {
                    return config.messages.uploadLimitReach;
                }
            }
        }
    },
    
    getFilesizeInBytes: function (filename) {
        //var _fs = require('fs');
        var stats = _fs.statSync(filename)
        var fileSizeInBytes = stats.size
        // InMegabytes 
        return fileSizeInBytes / 1000000.0;
    }
};

module.exports.AccGenBusiness = AccGenBusiness;