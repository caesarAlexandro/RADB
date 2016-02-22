 /**
 * @ComponentName: Confirmation Page Item View
 * @Description: The purpose of this Marionnette Item View object is to add the template, manipulate DOM, listen to
 * the events from the Confirmation page from the Booking Funnel.
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
        template :  JST['app/scripts/booking/confirmation/confirmation-template.hbs'],
        returningGuest: function() {
            var signedIn = $('#signOut');
            if (signedIn.hasClass('hidden') == false) {
                setTimeout(function() {
                    $('.showadriana').addClass('hidden');
                    $('.showcurt').removeClass('hidden');
                }, 1000);
            }
        },
        onRender: function() {
            this.returningGuest();
        }
    });
});
