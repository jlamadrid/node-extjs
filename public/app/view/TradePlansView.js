Ext.define('NodeExtJs.view.TradePlansView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.TradePlansView',
    store: 'TradePlanStore',    //will cause an instance of the TradePlanStore to be instantiated at run time, and assigned to the grid.
    selType: 'rowmodel',        //selType config option determines whether clicking on the grid selects a whole row (the default) or a specific cell (selType = 'cellmodel').
    rowEditor: Ext.create('Ext.grid.plugin.RowEditing', {   //RowEditing plugin allows you to choose whether it takes one or two clicks to edit the field.
        clicksToEdit: 2
    }),

    initComponent: function () {

        var tradePlansView = this;
        this.addEvents(['tradePlanEdit', 'tradePlanDelete']);

        //The definitions of the editable fields is done in the columns config.
        this.columns = [{
            header: 'Name',
            dataIndex: 'name',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: true
            }
        }, {
            header: 'Summary',
            dataIndex: 'summary',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: true
            }
        },{
            xtype: 'actioncolumn',
            width: 50,
            items: [
                {
                    icon: 'images/edit.png',  // Use a URL in the icon config
                    tooltip: 'Edit',
                    handler: function(grid, rowIndex, colIndex) {
                        tradePlansView.fireEvent('tradePlanEdit', {
                            rowIndex: rowIndex,
                            colIndex: colIndex
                        });
                    }
                },
                {
                    icon: 'images/delete.png',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        tradePlansView.fireEvent('tradePlanDelete', {
                            rowIndex: rowIndex,
                            colIndex: colIndex
                        });
                    }
                }
            ]
        }
        ];

        this.plugins = [ this.rowEditor ];

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Add Trade Plan'
                }
            ]
        }];

        this.callParent(arguments);
    }
});