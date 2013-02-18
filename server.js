
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

db = mongoose.connect('mongodb://127.0.0.1/tradetools');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//create the tradePlansModel using the 'tradeplans' collection as a data-source
TradePlan = mongoose.model('tradeplans', new mongoose.Schema({
    name: String,
    summary: String
}));

// Routes
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/extjs', function (req, res) {
    res.redirect('/extjs.html');
});

app.get('/tradeplans', function (req, res) {
    TradePlan.find({}, function (err, tradeplan) {
        res.contentType('json');
        res.json({
            success: true,
            data: tradeplan
        });
    });
});

app.put('/tradeplans/:id', function(req, res){
    TradePlan.find({_id: req.params.id}, function (err, tradeplans) {
        // update db
        var tradeplan = tradeplans[0];
        tradeplan.set(req.body);
        tradeplan.save(function (err) {
            res.contentType('json');
            res.json({
                success: !err,
                data: req.body
            });
        });
    });
});

app.post('/tradeplans', function (req, res) {
    var newTradePlan = new TradePlan();
    var newTradePlanData = req.body;

    // remove the id which the client sends since it is a new TradePlan
    delete newTradePlanData['_id'];  //we want MongoDB to generate a new ID for the new TradePlan,
                                     // so we delete the bogus one we got from the client, and
                                     // then the _id field will automatically be created when
                                     // the new TradePlan is saved to the database.

    newTradePlan.set(newTradePlanData);
    newTradePlan.save(function (err, tradeplan) {
        res.contentType('json');
        res.json({
            success: !err,
            data: tradeplan
        });
    });
});

app.del('/tradeplans/:id', function(req, res){
    TradePlan.remove({_id: req.params.id}, function (err, tradePlan) {
        res.contentType('json');
        res.json({
            success: !err,
            data: []
        });
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});