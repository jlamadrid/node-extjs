Ext.define('NodeExtJs.view.TradePlansView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.TradePlansView',
    store: 'TradePlanStore',  //will cause an instance of the TradePlanStore to be instantiated at run time, and assigned to the grid.

    initComponent: function () {

        this.columns = [{
            header: 'Name',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Summary',
            dataIndex: 'summary',
            flex: 1
        }];

        this.callParent(arguments);
    }
});