 /**
 * @ComponentName: Footer Item View
 * @Description: The purpose of this Marionnette Item View object is to add the template, manipulate DOM, listen to
 * the events for the Footer webpage.
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates'
], function ($, _, Backbone, Marionette, JST) {
    'use strict';

    return Marionette.ItemView.extend({
        template:  JST['app/scripts/common/footer/footer-template.hbs']
    });

});
