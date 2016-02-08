 /**
 * @ComponentName: Footer Controller
 * @Description: The purpose of this javascript object is to define the function that will be execute based on the
 * footer-Router definition
 **/

define([
    'jquery',
    'backbone',
    'marionette'
    /*jshint unused:false*/
], function ($, Backbone, Marionette, MainLayout, NavView) {
    'use strict';
    var mainController = {
        default : function () {
            console.log('Footer');
        }
    };
    return mainController;

});
