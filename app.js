/**
 * Module dependencies.
 */
var express = require('express'),
    http = require('http'),
    cookieParser = require('cookie-parser'),
    compress = require('compression'),
    favicon = require('serve-favicon'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    lusca = require('lusca'),
    methodOverride = require('method-override'),

    _ = require('lodash'),
    MongoStore = require('connect-mongo')(session),
    flash = require('express-flash'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    expressValidator = require('express-validator'),
    sass = require('node-sass-middleware'),

    /**
     * API keys and Passport configuration.
     */
    secrets = require('./config/secrets'),
    settings = require('./config/settings'),
    passportConf = require('./config/passport'),

    /**
     * Create Express server.
     */
    app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(settings.db);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

/**
 * Express configuration.
 */
app.locals.basicTitle = settings.appTitle;
app.set('port', settings.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'expanded'
}));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser(secrets.cookieSecret, {
    maxAge: 31556926, // one year
    firstPartyOnly: true
}));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets.sessionSecret,
    store: new MongoStore({
        url: settings.db,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
    csrf: true,
    xframe: 'SAMEORIGIN',
    xssProtection: true
}));
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});
app.use(function(req, res, next) {
    if (/api/i.test(req.path)) req.session.returnTo = req.path;
    next();
});
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 31557600000
}));


/**
 * Primary app routes.
 */
require('./routes')(app);

/**
 * Error Handler.
 */
app.use(errorHandler());

module.exports = app;
