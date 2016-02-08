 /**
 * @ComponentName: Name for the Component
 * @Description: The purpose of this Marionnette Item View object is to add the template, manipulate DOM, listen to
 * the events from the XXXXXX.
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'templates'
], function ($, _, Backbone, Marionette, Handlebars, JST) {
    'use strict';
    return Marionette.ItemView.extend({
        template: JST['app/scripts/templates/view.template.hbs'],
        tagName: 'div',
        id: '',
        className: '',
        events: {},
        initialize: function () {
            //devComment Please add the Handlebars Partial on here.
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });
});
