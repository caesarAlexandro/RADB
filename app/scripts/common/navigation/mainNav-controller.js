 /**
 * @ComponentName: Booking Funnel Controller
 * @Description: The purpose of this javascript object is to define the function that will be exceuted based on the
 * navMain-Router definition
 **/

define([
    'underscore',
    'jquery',
    'backbone',
    'marionette',
    'common/utility/misc/data',
    'common/main-layoutView'
    /*jshint unused:false*/
], function (_, $, Backbone, Marionette, Data, MainLayout) {
    'use strict'
    /**
    * @var mainLayout - Instance the Main Layout for the application.
    * @var bookingLayout - Variable to store the Instance the Booking Layout for the booking application.
    * @var hotelSummaryView - Variable to store the Hotel Summary Information
    * @var booking controller - Variable to controller fuctions that will be pased to the navPrimary-router
    **/
    var mainNavController = {
            /**
            * @function default
            * @description display the Home view on Main layout.
            **/
            default : function () {
                require(['booking/bookingHome/bookingHome-itemView',
                         'common/utility/misc/mainViewManager-utility',
                        'booking/common/utility/misc/bookingViewManager-util',
                        'booking/bookingHome/data/bookingHomePromo-model',
                        'booking/bookingHome/data/bookingHomeDestinations-model'],
                        function (HomeView, mainViewManager, bookingViewManager, bookingPromoModel, bookingDestModel) {
                    var currentRoute =  Backbone.history.getFragment();
                    var homeView = new HomeView({brand : currentRoute});
                    var mainLayout = mainViewManager.init();
                    var promoModel = new bookingPromoModel();
                    var destModel = new bookingDestModel();
                    Data.themeSwitch(currentRoute);
                    var region = mainLayout.getRegion('content');
                    // mainLayout.changeLogo(currentRoute);
                    $.when(
                        promoModel.fetch({
                            dataType: 'jsonp'
                        }),
                        destModel.fetch({
                            dataType: 'jsonp'
                        })
                        ).done(function() {
                            mainLayout.getRegion('content').show(homeView);
                            homeView.changeImg(currentRoute);
                            homeView.renderDatepicker();
                            homeView.renderCarousel();
                            bookingViewManager.clearLayout();
                            Data.fullBg('[data-cover]');
                            mainLayout.changeToHeaderFloating();
                        });
                    // promoModel.deferred.done(function () {
                    // });
                });
            },
        };
    return mainNavController;
});
