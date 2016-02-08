 /**
 * @ComponentName: Main Router for Application
 * @Description: The goal for this component is to describe the routes for the navigation menu and the booking funnel routes
 * for the application and associate them with their function.
 **/

define([
    'jquery',
    'backbone',
    'marionette',
    'common/navigation/mainNav-controller',
    'common/main-layoutView'
], function ($, Backbone, Marionette, mainNavController, MainLayout) {
    'use strict'
    var mainLayout = new MainLayout({el : '#appContainer'}).render();
    return Marionette.AppRouter.extend({
        controller : mainNavController,
        appRoutes : {
            '': 'default',
            'radissonRed' : 'default'
        }
    });
});
