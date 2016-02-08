 /**
 * @ComponentName Layout view Name
 * @Description: The purpose of this Marionnette Layout View object is to add the template, manipulate DOM, listen to
 * the events, add the regions and render process for the XXXXXXX
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates'
], function ($, _, Backbone, Marionette, JST) {
    'use strict';
    return Marionette.LayoutView.extend({
        tagName : 'div',
        template : JST['app/scripts/templates/view.template.hbs'],
        regions : {
        },
        onRender : function () {
        }
    });
});
