
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

var tradeplanRoute = require('./routes/tradeplan')(mongoose);

app.configure(function(){
  console.log("Setting applicaiton config.");
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  mongoose.connect('mongodb://127.0.0.1/tradetools', function onMongooseError(err) {
    if (err) throw err;
  });

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/extjs', function (req, res) {
    res.redirect('/extjs.html');
});

//RESTFull routes for tradeplan
app.get('/tradeplans', tradeplanRoute.tradeplans);  //curl -s http://localhost:3000/tradeplans
app.put('/tradeplans/:id', tradeplanRoute.updateTradePlan);
app.post('/tradeplans', tradeplanRoute.createTradePlan);
app.del('/tradeplans/:id', tradeplanRoute.deleteTradePlan);


//create server
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});