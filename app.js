var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
var logger = require('morgan');
var sass = require('node-sass-middleware');
var routes = require('./routes/index');


//find out what path is
var path = require('path');

var app = express();


app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.use(
  sass({
    src: __dirname + '/assets', //where the sass files are 
    dest: __dirname + '/public', //where css should go
    debug: true
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// app.use(
//   sass({
//     src: __dirname + '/public/sass', //where the sass files are 
//     dest: __dirname + '/public/css', //where css should go
//     debug: true
//   })
// );

app.listen(3000, function(){
	console.log('Starting server!!!');
});


// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle all errors (anything passed into next())
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log({error: err});
    res.render('error', {
    	message: err.message,
    	error: err

    });
});

