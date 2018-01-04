var express = require('express');
var path = require('path');
var accGenBusiness = require('../business/acc-gen-business.js').AccGenBusiness;
var router = express.Router();
var virtualDirPath = process.env.virtualDirPath || '';
var uuidv1 = require('uuid/v1'); //time-based
//var cookie = require('tough-cookie').Cookie.parse(header);

var defaultData = {
    year: new Date().getFullYear(),
    isProd: process.env.NODE_ENV === 'production',
    virtualDirPath: virtualDirPath
};

/* GET home page. */
router.get('/', function (req, res) {
    if (!req.session['svgStore']) {
        req.session['svgStore'] = uuidv1().toString();
    } else {
        defaultData.uploaded = accGenBusiness.getSVGBase64FromDirectory(path.join(__dirname, '..', 'public', 'generator', 'svgs', req.session['svgStore']));
    }

    //accGenBusiness.removeFilesFromDirectory(path.join(__dirname, '..', 'public', 'generator', 'svgs', req.session['svgStore']));
    res.render('index', defaultData);

}).get('/new', function (req, res) { //removing Files And renewing session
    if (req.session['svgStore']) {
        accGenBusiness.removeFilesFromDirectory(path.join(__dirname, '..', 'public', 'generator', 'svgs', req.session['svgStore']));
    }

    req.session['svgStore'] = uuidv1().toString();

    res.redirect(virtualDirPath + '/');
});





module.exports = router;

