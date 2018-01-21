var express = require('express');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var accGenBusiness = require('../business/acc-gen-business.js').AccGenBusiness;

var generatorPath = path.join(__dirname, '..', 'public', 'generator');
var svgPath = path.join(generatorPath, 'svgs');
var releasePath = path.join(generatorPath, 'releases');
accGenBusiness.createFolderIfNotExists(svgPath);
accGenBusiness.createFolderIfNotExists(releasePath);

var router = express.Router();

router
    .post('/uploadsvg', function (req, res) {
        var subfolderPath = path.join(svgPath, req.session['svgStore']);
        var folderCreationError = accGenBusiness.createFolderIfNotExists(subfolderPath);
        if (folderCreationError) {
            accGenBusiness.error(res, folderCreationError);
        } else {
            var sizeLimitReached = accGenBusiness.checkFolderSize(subfolderPath);
            if (sizeLimitReached) {
                accGenBusiness.error(res, sizeLimitReached);
            } else {
                var form = new formidable.IncomingForm();
                form.multiples = true;
                form.parse(req, function (err, fields, files) {
                    var _err;
                    var _files = [];
                    for (_filekey in files) {
                        var old_path = files[_filekey].path;
                        var file_name = files[_filekey].name
                        var new_path = path.join(subfolderPath, file_name);

                        _err = accGenBusiness.savefile(old_path, new_path);
                        _files.push({ key: _filekey, path: new_path });
                    };

                    if (_err) {
                        accGenBusiness.error(res, _err);
                    } else {
                        accGenBusiness.success(res, _files);
                    }
                });
            }
        }
    })

    .post('/removePicture', function (req, res) {
        var _err = accGenBusiness.removeFilesFromPath([path.join(svgPath, req.session['svgStore'], req.body.path)]);
        if (_err) {
            accGenBusiness.error(res, _err);
        } else {
            accGenBusiness.success(res);
        }
    })

    .get('/generateSprite', function (req, res) {
        var timestamp = new Date().getTime().toString();
        var cssPrefix = req.query.prefix || "icon";
        var padding = parseInt((req.query.padding || 1)) + 1;
        var svgFolder = req.session['svgStore'];

        var exec = require('child_process').exec;

        var deleteRelease = function (zipFilePath) {
            var _err = accGenBusiness.removeFilesFromPath([zipFilePath]);
            if (_err) {
                console.log(_err);
            }
            _err = accGenBusiness.removeFolderRecursive(path.join(releasePath, 'sprite_' + timestamp));
            if (_err) {
                console.log(_err);
            }
        };


        var runCmd = function (item, options, callback) {
            var cmd = exec(item, options);
            cmd.stdout.on('data', function (data) {
                console.log(data);
            });
            cmd.stderr.on('data', function (data) {
                console.log(data);
            });
            cmd.on('exit', function (code) {
                if (code !== 0) throw new Error(item + ' failed');
                console.log('done\n');
                callback();
            });
        };
        var gruntCmd = accGenBusiness.strFormat('grunt --timestamp={0} --svgFolder={1} --cssPrefix={2} --padding={3}', timestamp, svgFolder, cssPrefix, padding);
        runCmd(gruntCmd, { cwd: path.join(generatorPath, 'grunt', 'sprite') }, function (err, results) {
            if (err) {
                console.log(err);
            } else {
                var zipFilePath = path.join(releasePath, 'sprite_' + timestamp + '.zip');
                var filename = path.basename(zipFilePath);
                res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                res.setHeader('Content-type', 'application/zip');

                var filestream = fs.createReadStream(zipFilePath);
                filestream.pipe(res);

                //deleteRelease(zipFilePath);
            }
        });
    });


module.exports = router;