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
    'booking/common/utility/misc/bookingViewManager-util',
    'common/utility/misc/data'
    /*jshint unused:false*/
], function (_, $, Backbone, Marionette, bookingViewManager, Data) {
    'use strict';
    /**
    * @var mainLayout - Instance the Main Layout for the application.
    * @var bookingLayout - Variable to store the Instance the Booking Layout for the booking application.
    * @var hotelSummaryView - Variable to store the Hotel Summary Information
    * @var booking controller - Variable to controller fuctions that will be pased to the navPrimary-router
    **/
    var bookingLayout,
        paymentModel,
        bookingController = {
            /**
            * @function default
            * @description display the Home view on Main layout.
            **/
            /**
            * @function hotelList
            * @description create the instance of bookingLayout. After it it renders the booking Layout
            * that is a children of mainLayout. It check the collections promise in order to display the list of the hotel
            * from the current brands and the list of hotel that are nearby on other brands from Carlson.
            **/
            hotelList : function (query) {
                require(['booking/hotelList/currentBranchResults/currentBranchList-collectionView',
                        'booking/hotelList/data/currentBranchList-collection',
                        'booking/hotelList/recommendedResults/recommendedList-collectionView',
                        'booking/hotelList/data/recommendedList-collection',
                        'booking/hotelList/hotelList-layoutView',
                        'booking/hotelList/loading/loading-itemView'], function (CurrentBranchListView,
                                                                                CurrentBranchListCollection,
                                                                                RecommendedListView,
                                                                                RecommendedListCollection,
                                                                                HotelListLayout, LoadingView) {
                    // jscs:disable validateIndentation

                        var currentBranchListCollection = new CurrentBranchListCollection(0),
                            recommendedListCollection = new RecommendedListCollection(0);
                    var hotelListLayout = new HotelListLayout();
                    bookingViewManager.hotelListInit(query);
                    bookingLayout = bookingViewManager.init();
                    bookingLayout.getRegion('contentPage').show(hotelListLayout);
                    hotelListLayout.getRegion('currentBranchResults').show(new LoadingView());
                    $.when(currentBranchListCollection.deferred).done(_.bind(function () {
                        var totalResults = currentBranchListCollection.length;
                        sessionStorage.setItem('currentTotalResults', totalResults);
                        var currentListing = new CurrentBranchListView({
                            collection : currentBranchListCollection
                        });
                        var contentRegion = hotelListLayout.getRegion('currentBranchResults');
                        $(contentRegion.el).slideUp(function () {
                            hotelListLayout.getRegion('currentBranchResults').empty();
                            contentRegion.show(currentListing);
                            $(contentRegion.el).slideDown();
                            Data.fullBg('[data-cover]');
                            Data.listingSort('.sort-distance', currentListing.collection, 'distance', '.search-filter');
                            Data.listingSort('.sort-price', currentListing.collection, 'price', '.search-filter');
                            Data.listingSort('.sort-rating', currentListing.collection, 'rating', '.search-filter');
                        });
                    }, this));
                    bookingViewManager.clearSummary();
                    //jscs:disable validateIndentation
                    Data.themeSwitch(query);
                });
            },
            /**
            * @function hotelInfo
            * @description create the instance of bookingSummary if it wasn't create yet. Remove filter
            * display hotel Info Page.
            **/
            hotelInfo : function (query) {
                require(['booking/hotelInfo/hotelInfo-itemView', 'booking/hotelInfo/data/hotelInfo-model', 'backboneRadio'], function (HotelInfoView, HotelInfoModel) {
                    if (Backbone.Radio.channel('Booking').request('BookModel') === undefined) {
                            Backbone.history.navigate('booking/hotelList/', true);
                    } else {
                        var bookingModel = Backbone.Radio.channel('Booking').request('BookModel').attributes,
                            bookingLayout = bookingViewManager.init(),
                            hotelInfoModel;
                        bookingViewManager.hotelInfoInit(query);
                        hotelInfoModel = new HotelInfoModel();
                        hotelInfoModel.set(bookingModel);

                        var contentRegion = bookingLayout.getRegion('contentPage');
                        $(contentRegion.el).fadeOut(function () {
                            contentRegion.show(new HotelInfoView({
                                model : hotelInfoModel
                            }));
                            Data.themeSwitch(query);
                            $(contentRegion.el).fadeIn();
                            Data.fullBg('[data-cover]');
                            Data.animatedScroll('[data-scroll]');
                        });
                    }
                });
            },
            /**
            * @function roomPayment
            * @description display the room Payment view. It checks if summary is already created, so it doesn't instance
            * again this view. It removes Modify search and change the contant of the page. It also runs
            * data cover function
            * to make the responsive images.
            **/
            roomPayment : function (query) {
                require(['booking/roomPayment/roomPayment-ItemView',
                         'booking/roomPayment/data/payment-model'], function (RoomPaymentView, PaymentModel) {
                    if (!bookingLayout) {
                            Backbone.history.navigate('booking/hotelList', true);
                        }
                    else {
                        var bookingModel = Backbone.Radio.channel('Booking').request('BookModel').attributes,
                            searchModel = Backbone.Radio.channel('Booking').request('SearchModel').attributes,
                            roomPaymentView;
                        bookingViewManager.roomPaymentInit(query);
                        paymentModel = new PaymentModel();
                        paymentModel.set(bookingModel);
                        paymentModel.set(searchModel);
                        roomPaymentView = new RoomPaymentView({
                            model : paymentModel,
                            brand : query
                        });
                        var contentRegion = bookingLayout.getRegion('contentPage');
                        $(contentRegion.el).fadeOut(function () {
                            contentRegion.show(roomPaymentView);
                            $(contentRegion.el).fadeIn();
                            Data.themeSwitch(query);
                            Data.fullBg('[data-cover]');
                        });
                        //setTimeout(renderCarousel, 2000);
                    }
                });
            },
            /**
            * @function confirmation
            * @description change the Header for confirmation and change the content.
            **/
            confirmation : function (query) {
                require(['booking/confirmation/confirmation-itemView'], function (ConfirmationView) {
                    if (!bookingLayout) {
                            Backbone.history.navigate('booking/hotelList', true);
                    } else {
                        var contentRegion = bookingLayout.getRegion('contentPage');
                        $(contentRegion.el).fadeOut(function () {
                            contentRegion.show(new ConfirmationView({
                                model : paymentModel
                            }));
                            Data.themeSwitch(query);
                            Data.fullBg('[data-cover]');
                            bookingViewManager.confirmationInit();
                            $(contentRegion.el).fadeIn();
                        });
                    }
                });
            }
        };
    return bookingController;
});
