define([
    'booking/common/booking-layoutView',
    'booking/common/hotelSummary/hotelSummary-itemView',
    'booking/common/modifySearch/modifySearch-itemView',
    'booking/common/filter/filter-itemView',
    'booking/bookingHome/data/bookingHome-model',
    'common/utility/misc/mainViewManager-utility'
], function (BookingLayout, HotelSummaryView, ModifySearchView, FilterView, BookingHomeModel, mainViewManager) {
    var mainLayout,
        bookingLayout,
        hotelSummaryView,
        previusPage,
        bookingModel;
    return {
        init : function () {
            if (typeof bookingLayout === 'undefined') {
                bookingLayout = new BookingLayout();
                mainLayout.getRegion('content').show(bookingLayout);
            }
            return bookingLayout;
        },
        clearLayout : function () {
            bookingLayout = undefined;
        },
        clearSummary : function () {
            bookingLayout.getRegion('bookHeader').empty();
            $(bookingLayout.getRegion('bookHeader').el).append('<div id="book-header" class="page-header-wrapper container"></div>');
        },
        hotelSummaryInit : function () {
            //bookingLayout.getRegion('filter').empty();
            //bookingLayout.getRegion('modifySearch').empty();
            if (!hotelSummaryView) {
                var bookingChannel = Backbone.Radio.channel('Booking');
                var bookingModel = bookingChannel.request('BookModel');
                var searchModel = Backbone.Radio.channel('Booking').request('SearchModel');
                if (searchModel)
                {
                    searchModel = searchModel.attributes;
                }
                else
                {
                    var retreivedJson = JSON.parse(sessionStorage.getItem('SearchModel'));
                    var newModel = new BookingHomeModel();
                    newModel.attributes = retreivedJson;
                    bookingChannel.reply('SearchModel', newModel);
                    searchModel = retreivedJson;
                }
                bookingModel.set(searchModel);
                hotelSummaryView = new HotelSummaryView({
                    el : '#book-header',
                    model : bookingModel
                });
                bookingLayout.getRegion('bookHeader').show(hotelSummaryView);
            }else {
                previusPage = 'hotelInfo';
                hotelSummaryView.changeHeader('HotelInfo');
            }
        },
        hotelListInit : function (query) {
            var bookingChannel = Backbone.Radio.channel('Booking'),
                bookingModel = bookingChannel.request('SearchModel');
            if (!bookingModel) {
                var retreivedJson = JSON.parse(sessionStorage.getItem('SearchModel'));
                var newModel = new BookingHomeModel();
                newModel.attributes = retreivedJson;
                bookingChannel.reply('SearchModel', newModel);
                bookingModel = newModel;
            }
            //bookingModel = new BookingHomeModel();
            mainLayout = mainViewManager.init();
            //mainLayout.changeToHeaderInverse();
            hotelSummaryView = null;
            this.init();
            bookingLayout.getRegion('filter').show(new FilterView());

            bookingLayout.getRegion('modifySearch').show(new ModifySearchView({
                model : bookingModel
            }));
            bookingLayout.routeChange();
        },
        hotelInfoInit : function (query) {
            if (!bookingLayout) {
                Backbone.history.navigate('/', true);
            } else {
                mainLayout = mainViewManager.init();
                //mainLayout.changeToHeaderInverse();
                this.init();
                //bookingLayout.routeChange();
                //bookingLayout.changeHeaderImg(query);
                this.hotelSummaryInit();
                //mainLayout.changeLogo(query);
            }
        },
        roomPaymentInit : function (query) {
            previusPage = 'payment';
            if (!bookingLayout) {
                Backbone.history.navigate('/', true);
            } else if (!hotelSummaryView) {
                this.hotelSummaryInit();
                hotelSummaryView.changeHeader('Payment');
            } else {
                hotelSummaryView.changeHeader('Payment');
            }
            //bookingLayout.routeChange();
            //bookingLayout.changeHeaderImg(query);
            //mainLayout.changeLogo(query);
        },
        confirmationInit : function () {
            if (!bookingLayout) {
                Backbone.history.navigate('/', true);
            }
            hotelSummaryView.changeHeader('Confirmation');
        }
    }
});
