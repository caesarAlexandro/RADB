/* jshint ignore:start */
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'common/navigation/nav-itemView',
    'booking/bookingHome/bookingHome-itemView',
    'common/navigation/footer-itemView',
    'templates'
], function ($, _, Backbone, Marionette, NavView, HomeView,FooterView, JST) {
    'use strict';
    
    describe('Main View Layout', function() {
     beforeEach(function () {
     
         view = new LayoutView();
        });
    });
        describe('when view is constructing', function () {

        it ('should exist', function () {
            expect(view).toBeDefined();
        });

    });
        describe('when view is rendered', function () {

    beforeEach(function () {
        view.render();
    });
        });
});
var view = new Marionette.LayoutView({

 regions : {
  'menu' : '#menu',
  'content' : '#content',
  'footer' : 'footer'
 },

onRender : function() {
   try {
     view.getRegion("menu")._ensureElement()
     // element exists
   } catch {
     //element does not exist
   }

});
       describe('layoutView', function() {
  'use strict';

  beforeEach(function() {
    this.layoutViewManagerTemplateFn = _.template('<div id="regionOne"></div><div id="regionTwo"></div>');
    this.template = function() {
      return '<span class=".craft"></span><h1 id="#a-fun-game"></h1>';
    };

    this.LayoutView = Backbone.Marionette.LayoutView.extend({
      template: this.layoutViewManagerTemplateFn,
      regions: {
        regionOne: '#regionOne',
        regionTwo: '#regionTwo'
      },
      initialize: function() {
        if (this.model) {
          this.listenTo(this.model, 'change', this.render);
        }
      },
      onBeforeRender: function() {
        return this.isRendered;
      },
      onRender: function() {
        return this.isRendered;
      }
    });
  });
           
            describe('when regions are defined as a function', function() {
    beforeEach(function() {
      var suite = this;
      this.LayoutView = Marionette.LayoutView.extend({
        template: 'app/scripts/common/main-template.hbs',
        regions : {
              'menu' : '#menu',
              'content' : '#content',
              'footer' : 'footer'
             },
      });
    });
                
            });
           /* jshint ignore:end */