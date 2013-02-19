/*
 http://docs.sencha.com/ext-js/4-1/#!/api/Ext.app.Controller
 */
Ext.define("NodeExtJs.controller.TradePlansController", {
    extend: 'Ext.app.Controller',

    /*
     Views are managed by Controllers, so it makes sense to keep those dependencies here.
     Each Controller simply needs to list the Views it uses and they will be automatically loaded
     */
    views: ['TradePlansView'],
    models: ['TradePlan'],
    stores: ['TradePlanStore'],

    /*
     Called before the Application's launch function is executed so gives a hook point to run any code
     before your Viewport is created.
     */
    init: function () {
        console.log('Initialized NodeExtJs.controller.TradePlansController');

        //http://docs.sencha.com/ext-js/4-1/#!/api/Ext.app.Controller-method-control
        this.control({
            'TradePlansView': {
                render: this.onEditorRender,
                edit: this.afterTradePlanEdit,
                tradePlanEdit: this.onTradePlanEdit,
                tradePlanDelete: this.onTradePlanDelete
            },
            'TradePlansView button': {
                click: this.addTradePlan
            }
        });
    },

    onTradePlanEdit: function (evtData) {

        var tradePlanStore = this.getStore('TradePlanStore');
        var record = tradePlanStore.getAt(evtData.rowIndex);
        if(record) {
            this.rowEditor.startEdit(record, this.tradePlansView.columns[evtData.colIndex]);
        }
    },

    onTradePlanDelete: function (evtData) {
        var tradePlanStore = this.getStore('TradePlanStore');
        var record = tradePlanStore.getAt(evtData.rowIndex);
        if(record) {
            tradePlanStore.remove(record);
            tradePlanStore.sync();
        }
    },

    afterTradePlanEdit: function () {
        var tradePlanStore = this.getStore('TradePlanStore');
        tradePlanStore.sync();
    },

    addTradePlan: function () {
        console.log("TradePLanEdit");
        var newTradePlan,
            tradePlanStore = this.getStore('TradePlanStore');

        // add blank item to store -- will automatically add new row to grid
        newTradePlan = tradePlanStore.add({
            name: '',
            summary: ''
        })[0];

        this.rowEditor.startEdit(newTradePlan, this.tradePlansView.columns[0]);
    },

    onEditorRender: function () {
        //cache a reference to the moviesEditor and rowEditor
        this.tradePlansView = Ext.ComponentQuery.query('TradePlansView')[0];
        this.rowEditor = this.tradePlansView.rowEditor;
    }
});