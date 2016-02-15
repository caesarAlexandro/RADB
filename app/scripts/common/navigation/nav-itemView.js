 /**
  * @ComponentName: Navigation Item View
  * @Description: The purpose of this Marionnette Item View object is to add the template, manipulate DOM, listen to
  * the events from the Navigation webpage.
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
         template: JST['app/scripts/common/navigation/nav-template.hbs'],
         /**
          * @function initialize
          * @description Add the Partials for the navigation content.
          */
         events: {
             'click .navbar-brand': 'goHome',
             'click #signIn' : 'signed',
             'click #signOut' : 'signedOut'
         },
         initialize: function () {
             Handlebars.registerPartial('navContent',
                 JST['app/scripts/common/navigation/navContent_partialTemplate.hbs']);
         },
         signed: function () {
             $('#signOut').removeClass('hidden');
             $('#signIn').addClass('hidden');
         },
         signedOut: function () {
             $('#signIn').removeClass('hidden');
             $('#signOut').addClass('hidden');
         },
         changeLogo: function (imgSrc) {
             $('#brandLogo').attr('src', imgSrc);
         },
         goHome: function () {
             if ($('html').hasClass('theme-radissonRed')) {
                 Backbone.history.navigate('/radissonRed', true);
             } else {
                 Backbone.history.navigate('/', true);
             }
             $(window).scrollTop(0, 0);
         }
     });
 });
