Ext.define('NodeExtJs.model.TradePlan', {
    extend: 'Ext.data.Model',
    idProperty: '_id',

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'summary',
        type: 'string'
    }]
});