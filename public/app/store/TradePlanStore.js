Ext.define('NodeExtJs.store.TradePlanStore', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    fields: ['name', 'summary'],

    // Data removed, instead using proxy:
    proxy: {
        type: 'ajax',
        url: '/tradeplans',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});