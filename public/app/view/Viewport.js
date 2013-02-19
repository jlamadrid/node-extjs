Ext.define('NodeExtJs.view.Viewport', {
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'border'
    },

    defaults: {
        collapsible: true,
        split: true,
        bodyStyle: 'padding:5px'
    },
    items: [{
        title: 'Footer',
        region: 'south',
        height: 150,
        minSize: 75,
        maxSize: 250,
        cmargins: '5 0 0 0'
    },{
        title: 'Navigation',
        region:'west',
        margins: '5 0 0 0',
        cmargins: '5 5 0 0',
        width: 175,
        minSize: 100,
        maxSize: 250
    },{
        xtype: 'panel',
        title: 'TradePlans',
        region:'center',
        collapsible: false,
        margins: '5 0 0 0',
        items: [{
            xtype: 'TradePlansView'
        }]
    },{
        title: 'Util',
        region:'east',
        margins: '5 0 0 0',
        cmargins: '5 5 0 0',
        width: 175,
        minSize: 100,
        maxSize: 250
    }]
});