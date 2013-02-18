Ext.define('NodeExtJs.store.TradePlanStore', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    autoSync: false,
    fields: ['_id', 'name', 'summary'],

    // Data removed, instead using proxy:
    proxy: {
        type: 'rest',
        url: '/tradeplans',
        model: 'NodeExtJs.model.TradePlan',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});