var express = require('express');
var routes = require('./routes');
//var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable = require('formidable');
//var session = require('express-session');
var session = require('cookie-session');
var uuidv1 = require('uuid/v1'); //time-based
var virtualDirPath = process.env.virtualDirPath || '';
var app = express();


// development only
if (process.env.NODE_ENV === 'development') {
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    genid: function (req) {
        return uuidv1(); // use UUIDs for session IDs
    },
    secret: 'labs-web-generator',
    resave: true,
    saveUninitialized: true
}));

app.use(session({
    name: 'labs-web-generator',
    keys: [uuidv1(), uuidv1(), uuidv1(), uuidv1()],
    cookie: {
        //secure: process.env.NODE_ENV === 'development' ? false : true,
        httpOnly: true,
        domain: 'techlabs.accenture.com'
    }
}));
app.use(express.static(path.join(__dirname, virtualDirPath, 'public')));

app.use(virtualDirPath + '/', require('./routes/index'));
app.use(virtualDirPath + '/sprite', require('./routes/sprite'));
app.use(virtualDirPath + '/generate', require('./routes/gen-web'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}


module.exports = app;

if (virtualDirPath && virtualDirPath != '') //Meaning it is IIS node hosted
{
    var debug = require('debug')('SvgSpriter');

    app.set('port', process.env.PORT || 3000);

    var server = app.listen(app.get('port'), function () {
        debug('Express server listening on port ' + server.address().port);
    });

    console.log("SvgSpriter started at" + new Date().toString());
}
