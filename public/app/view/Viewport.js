Ext.define('NodeExtJs.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: 'fit',

    items: [{
        xtype: 'panel',
        title: 'TradePlans',
        items: [{
            xtype: 'TradePlansView'
        }]
    }]
});