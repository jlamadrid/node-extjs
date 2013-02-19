
Ext.application({

    /*
     All of your Application's classes (such as its Models, Views and Controllers) will reside under this single namespace,
     which drastically lowers the chances of colliding global variables. The MyApp global will also have a getApplication
     method to get a reference to the current application:
     */
    name: "NodeExtJs",
    appFolder: "app",

    autoCreateViewport: true,

    /*
     Because an Ext.app.Application represents an entire app, we should tell it about the other parts of the
     app - namely the Models, Views and Controllers that are bundled with the application.
     */
    controllers: [
        'TradePlansController'
    ],

    launch: function() {
        console.log("Called Ext.application launch.")
    }

});