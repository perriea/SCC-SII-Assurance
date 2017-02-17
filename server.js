// Framework ExpressJS
var express = require('express');
var robots = require('express-robots');
var pmx = require('pmx').init({http: true});

// HTTP/1.1 ou HTTP/2 (spdy)
var http = require('http');
var https = require('https');
var spdy = require('spdy');

var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var morgan = require("morgan");
var cors = require('cors');
var passport = require('passport');
var expressSession = require('express-session');
var fs = require('fs');
var favicon = require('serve-favicon');
var compression = require("compression");
var helmet = require("helmet");
var app = express();

var cronLauncher = require('./app/controllers/cron');

var colors = require(path.join(__dirname, '/config/color'));
var error = require(path.join(__dirname, '/app/controllers/error'));

// var ports + SSL
var ports = {
    http: 8080,
    https: 4433
};

var credentials = {
    key: fs.readFileSync(path.join(__dirname, '/config/ssl/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '/config/ssl/server.crt'))
};


// var locale app
app.locals.title = 'My App';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';


// configuration ===========================================

app.use(robots(path.join(__dirname, '/public/robots.txt')));

// show logs in console
app.use(morgan("common"));

// Recuperation des POST
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// read cookies (needed for auth)
app.use(cookieParser());

// accept cross domain *
app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// favicon
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

// compression => fast and light request
app.use(compression());

// anti XSS
app.use(helmet());


// Auth
// init de session Passport
app.use(expressSession({
    secret: 'RANDOM',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// routes ==================================================
require('./app/routes')(app, passport, error); // configure our routes
require('./config/passport')(passport);

// start app ===============================================
// change http to https

console.log(colors.info('RESTful API running, PID : ' + process.pid));

/*httpServer = http.createServer(function (req, res) {
 res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
 res.end();
 }).listen(ports.http);*/

// HTTP/1.1
http.createServer(app).listen(ports.http, () => console.log(colors.verbose('Port serveur HTTP (API) : ' + ports.http)));
https.createServer(credentials, app).listen(ports.https, () => console.log(colors.verbose('Port serveur HTTPS (API) : ' + ports.https)));

// HTTP/2
//httpsServer = spdy.createServer(credentials, app).listen(ports.https);

cronLauncher.cronLaunch();

exports = module.exports = app;