/**
* @ComponentName Route Name
* @Description The goal for this component is to describe the routes for xxxxxx for the application and associate them with
* their function.
**/

define([
    'jquery',
    'backbone',
    'marionette',
    'controller/controller.template'
], function ($, Backbone, Marionette, routerController) {
    'use strict';
    return Marionette.AppRouter.extend({
        controller : routerController,
        appRoutes : {
            '': 'default'
        }
    });
});
