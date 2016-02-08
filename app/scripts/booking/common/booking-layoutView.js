 /**
 * @ComponentName Booking LayoutView
 * @Description: The purpose of this Marionnette Layout View object is to add the template, manipulate DOM, listen to
 * the events, add the regions and render process for the Booking funnel pages. This layout is a child from MainLayout
 * region Content.
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'booking/common/modifySearch/modifySearch-itemView',
    'booking/common/filter/filter-itemView',
    'booking/bookingHome/data/bookingHome-model',
    'templates',
    'common/utility/misc/data',
    'backboneRadio'
], function ($, _, Backbone, Marionette, ModifySearchView, FilterView,
              BookingHomeModel, JST, Data) {
    'use strict';
    return Marionette.LayoutView.extend({
        template : JST['app/scripts/booking/common/booking-template.hbs'],
        regions : {
            'modifySearch' : '#modifySearch',
            'filter' : '#filter',
            'bookHeader' : 'section.page-header',
            'contentPage' : '#content-page'
        },
        onRender : function () {
            var bookingChannel = Backbone.Radio.channel('Booking');
            this.showChildView('modifySearch', new ModifySearchView({model : new BookingHomeModel()}));
            this.showChildView('filter', new FilterView());
            bookingChannel.reply('Layout', this);
        },
        initialize: function () {
            this.render();
        },
        changeHeaderImg: function (query) {
            if (query === 'radissonRed') {
                $('#headerContainer').data('cover', 'assets/img/rr_header.png');
            } else {
                $('#headerContainer').data('cover', 'assets/img/header.png');
            }
        },
        /**
        * @function routeChange
        * @description This function will be excecute everytime the route change. It will update the style of container
        * and page header based on the route.
        */
        routeChange : function () {
            var bodySelector = $('body');
            var headerSelector = $('section.page-header');
            var header = '.page-header'
            var containerSelector = $('#content-page');
            //console.log(Backbone.history.getFragment());
            switch (Backbone.history.getFragment()) {
                case 'booking/guestInfo' :
                case 'booking/guestInfo/radissonRed' :
                    //bodySelector.removeClass().addClass('page-guestInfo');
                    Data.pageSwitch('guestInfo');
                    headerSelector.removeClass('page-header-lg hidden')
                        .addClass('page-header-sm page-header-book fixed');
                    containerSelector.addClass('container');
                    var headerBook = $('.page-header-book hidden', header);
                    headerBook.removeClass('hidden');
                    break;
                case 'booking/hotelList/hotelInfo' :
                case 'booking/hotelList/hotelInfo/radissonRed' :
                    //bodySelector.removeClass().addClass('page-hotelInfo');
                    Data.pageSwitch('hotelInfo');
                    headerSelector.removeClass('page-header-sm page-header-lg hidden');
                    containerSelector.removeClass('container');
                    break;
                case 'booking/hotelList' :
                case 'booking/hotelList/radissonRed' :
                    //bodySelector.removeClass().addClass('page-hotelList');
                    Data.pageSwitch('hotelList');
                    headerSelector.addClass('hidden');
                    containerSelector.removeClass('container');
                    break;
                case 'booking/confirmation' :
                case 'booking/confirmation/radissonRed' :
                    //bodySelector.removeClass().addClass('page-confirmation');
                    Data.pageSwitch('confirmation');
                    containerSelector.hide().removeClass('container');
                    headerSelector.addClass('page-header-lg')
                    .removeClass('page-header-sm fixed page-header-book hidden');
                    break;
                default :
                    Data.pageSwitch('default');
                    containerSelector.removeClass('container');
                    break;
            };
        }
    });
});
