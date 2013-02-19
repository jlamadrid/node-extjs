module.exports = function(mongoose) {

    var models = {
        TradePlan: require('../models/TradePlan')(mongoose)
    };

    var tradeplans = function (req, res) {
        models.TradePlan.getAllTradePlans(function(tradeplan){
            res.contentType('json');
            res.json({
                success: true,
                data: tradeplan
            });
        });
    };

    var updateTradePlan = function (req, res) {

        models.TradePlan.updateTradePlan(req.params.id, req, function(tradeplan){
            res.contentType('json');
            res.json({
                success: true,  //success: !err,
                data: req.body
            });
        });
    };

    var createTradePlan = function (req, res) {

        models.TradePlan.createTradePlan(req, function(tradeplan){
            res.contentType('json');
            res.json({
                success: true, //success: !err,
                data: tradeplan
            });
        });
    };

    var deleteTradePlan = function (req, res) {

        models.TradePlan.deleteTradePlan(req.params.id, function(tradeplan){
            res.contentType('json');
            res.json({
                success: true,  //success: !err,
                data: []
            });
        });

    };

    return {
        tradeplans: tradeplans,
        createTradePlan: createTradePlan,
        updateTradePlan: updateTradePlan,
        deleteTradePlan: deleteTradePlan
    };

}