/**
 * http://howtonode.org/node-js-and-mongodb-getting-started-with-mongojs
 * @param mongoose
 * @return {Object}
 */
module.exports = function(mongoose) {

    var TradePlan = mongoose.model('tradeplans', new mongoose.Schema({
        name: String,
        summary: String
    }));

    var getAllTradePlans = function ( callback) {
        TradePlan.find({}, function (err, tradeplan) {
            callback(tradeplan);
        });
    };

    var updateTradePlan = function ( id, req, callback) {

        console.log("Updating trade plan with req.body = " + JSON.stringify(req.body, null, 4));

        TradePlan.find({_id: id}, function (err, tradeplans) {
            // update db
            var tradeplan = tradeplans[0];
            tradeplan.set(req.body);
            tradeplan.save(function (err) {
                console.log("Trade Plan updated")
                callback(tradeplan);
            });
        });
    };

    var createTradePlan = function (req, callback) {

        var newTradePlan = new TradePlan();
        var newTradePlanData = req.body;

        console.log("createTradePlan with newTradePlanData = " + JSON.stringify(newTradePlanData, null, 4));

        // remove the id which the client sends since it is a new TradePlan
        delete newTradePlanData['_id'];  //we want MongoDB to generate a new ID for the new TradePlan,
        // so we delete the bogus one we got from the client, and
        // then the _id field will automatically be created when
        // the new TradePlan is saved to the database.

        newTradePlan.set(newTradePlanData);
        newTradePlan.save(function (err, tradeplan) {
            callback(tradeplan);
        });
    };

    var deleteTradePlan = function ( id, callback) {

        TradePlan.remove({_id: id}, function (err, tradePlan) {
          console.log("Deleted Trade Plan")
        });
    };

    return {
        getAllTradePlans: getAllTradePlans,
        createTradePlan: createTradePlan,
        updateTradePlan: updateTradePlan,
        deleteTradePlan: deleteTradePlan,
        TradePlan: TradePlan
    }
}