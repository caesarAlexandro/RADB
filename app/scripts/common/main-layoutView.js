 /**
 * @ComponentName: Main Layout view
 * @Description: The purpose of this Marionnette Layout View object is to add the template, manipulate DOM, listen to
 * the events, add the regions and render process for the Main Layout of the application. This Main Lauout will be the vif
 * container for the Views related to the Main Navigation. The Menu region and Footer is expected to by visible on all
 * the views of the application.
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'common/navigation/nav-itemView',
    'common/footer/footer-itemView',
    'common/utility/misc/data',
    'templates'
], function ($, _, Backbone, Marionette, NavView, FooterView, Data, JST) {
    'use strict';
    var navView;
    return Marionette.LayoutView.extend({
        tagName : 'div',
        template : JST['app/scripts/common/main-template.hbs'],
        regions : {
            'menu' : '#menu',
            'content' : '#content',
            'footer' : '#footer'
        },
        initialize: function () {
            this.render();
        },
        onRender : function () {
            navView = new NavView();
            this.showChildView('menu', navView);
            this.showChildView('footer', new FooterView());
        },
        changeToHeaderInverse : function () {
            Data.disabledWaypointNav();
            $('#menu').removeClass('navbar-inverse');
        },
        changeToHeaderFloating : function () {
            Data.waypointNav();
            $('#menu').addClass('navbar-inverse');
        },
        changeLogo : function (query) {
            var imageSrc = 'assets/img/logo' + (query ? '-red.svg' : '.svg');
            navView.changeLogo(imageSrc);
        }
    });
});
