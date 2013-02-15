Ext.define("NodeExtJs.controller.TradePlansController", {
    extend: 'Ext.app.Controller',

    views: ['TradePlansView'],
    models: ['TradePlan'],
    stores: ['TradePlanStore'],

    init: function () {
        this.control({
            'TradePlanView': {
                render: this.onEditorRender
            }
        });
    },

    onEditorRender: function () {
        console.log("Trade Plan View was rendered");
    }
});