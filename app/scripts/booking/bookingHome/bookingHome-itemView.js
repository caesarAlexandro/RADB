/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'handlebars',
	'templates',
	'common/utility/misc/data',
	'vendor/webshim/js-webshim/dev/polyfiller.js',
    'booking/bookingHome/data/bookingHome-model',
    'booking/bookingHome/data/bookingHomePromo-model',
	'moment',
    'rangedatepicker',
    'owlcarousel'
], function ($, _, Backbone, Marionette, Handlebars, JST, Data, Calendar, BookingHomeModel, bookingHomePromoModel, moment, dateRangePicker, owlcarousel) {
    'use strict';
    var bookingChannel;
    return Marionette.ItemView.extend({
        initialize : function (option) {
            this.brandName = option.brand;
            bookingChannel = Backbone.Radio.channel('Booking');
            Handlebars.registerPartial('DatePicker',
                JST['app/scripts/booking/bookingHome/bookingHome-partialTemplate.hbs']);
            Handlebars.registerPartial('PromotionsHome',
                JST['app/scripts/booking/bookingHome/bookingHome-partialPromotions.hbs']);
            Handlebars.registerPartial('HomeCarousel',
                JST['app/scripts/booking/bookingHome/bookingHome-HomeCarousel.hbs']);
            Handlebars.registerPartial('PopularDestinations',
                JST['app/scripts/booking/bookingHome/bookingHome-partialPopularDestinations.hbs']);
            Handlebars.registerPartial('BotContainer',
                JST['app/scripts/booking/bookingHome/bookingHomeBotContainer-partialTemplate.hbs']);
        },
        /**
         *
         * @description events to trigger functions of calendar and search
         **/
        events: {
            'keyup .search-box input': 'showSearchResults',
            'click .list-results a' : 'showSearchTrip',
            'click a.check-in .wrapper, a.check-out .wrapper ' : 'toggleSearchCalendar',
            'focus .search-box input' : 'focusInput',
            'focusout .search-box input' : 'focusOutInput',
            'click .list-group-item.calendar.check-in' : 'renderDatepicker',
            'click #findHotel' : 'findHotel',
            'click a[href=#]' : 'prevent',
            'click #firstCont' : 'loadBotContainerData',
            'change #collapseRoomGuest #room #rooms': 'setRooms',
            'change #collapseRoomGuest #guest #guests': 'setGuests'
        },
        model : new BookingHomeModel(),
        promoModel : new bookingHomePromoModel(),
        onBeforeRender: function () {
            this.loadBotContainerData();
        },
        onRender: function () {
            /**
             * @functions
             * @description This code usea fullBg function for background image and webshim for calendar functionality
             **/
            Data.fullBg('[data-cover]');
            /*webshims.setOptions('forms-ext', {
                replaceUI: 'auto',
                types: 'date',
                date: {
                    startView: 2,
                    inlinePicker: true,
                    classes: 'hide-inputbtns'
                }
            });
            webshims.setOptions('forms', {
                lazyCustomMessages: true
            });
            webshim.polyfill('forms forms-ext');*/
            // this.loadBotContainerData();
        },
        renderCarousel : function () {
            $('#owl-demo').owlCarousel({
                navigation : true,
                navigationText : ['<i class="fa fa-chevron-left"></i>' , '<i class="fa fa-chevron-right"></i>'],
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
            $('#promotions-carousel').owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items : 4,
                itemsDesktop : [1199 , 3],
                temsDesktopSmall : [979 , 3]
            });
        },
        renderDatepicker: function ()
        {
            var self = this;
            $('input[name="daterange"]').each(function() {
                var datepicker;

                if ($(this).data('datepicker-type') === 'double')
                {
                    datepicker = $(this).dateRangePicker({
                        inline: true,
                        container: '#bt-datepicker',
                        alwaysOpen: true,
                        stickyMonths: true,
                        startDate: moment(),
                        showShortcuts: false,
                        showTopbar: false,
                        hoveringTooltip: function(days)
                        {
                            return days > 1 ? (days > 2 ? (days - 1) + ' Nights' : '1 Night') : '';
                        },
                        extraClass: 'visible-lg'
                    });
                }
                else
                {
                    datepicker = $(this).dateRangePicker({
                        inline: true,
                        container: '#bt-datepicker',
                        alwaysOpen: true,
                        singleMonth: true,
                        startDate: moment(),
                        showShortcuts: false,
                        showTopbar: false,
                        hoveringTooltip: function(days)
                        {
                            return days > 1 ? (days > 2 ? (days - 1) + ' Nights' : '1 Night') : '';
                        },
                        extraClass: 'hidden-lg'
                    });
                }
                var bookingModel = Backbone.Radio.channel('Booking');
                var searchModel;
                if (bookingModel) {
                    searchModel = Backbone.Radio.channel('Booking').request('SearchModel');
                    if (searchModel) {
                        searchModel = searchModel.attributes;
                        self.loadStoredData(self, searchModel, this);
                    } else {
                        var retreivedJson = JSON.parse(sessionStorage.getItem('SearchModel'));
                        if (retreivedJson) {
                            var newModel = new BookingHomeModel();
                            newModel.attributes = retreivedJson;
                            bookingChannel.reply('SearchModel', newModel);
                            searchModel = retreivedJson;
                            self.loadStoredData(self, searchModel, this);
                        }
                    }
                }
                $('#bt-datepicker').on('show.bs.collapse', function () {
                    $('#collapseRoomGuest').collapse('hide');
                }).on('shown.bs.collapse', function () {
                    $('.wrapper-check-in').addClass('active');
                }).on('hidden.bs.collapse', function () {
                    $('.wrapper-check-in').removeClass('active');
                    $('.wrapper-check-out').removeClass('active');
                });
                $('#collapseRoomGuest').on('show.bs.collapse', function () {
                    $('#bt-datepicker').collapse('hide');
                }).on('shown.bs.collapse', function () {
                    $('.wrapper-room').addClass('active');
                }).on('hidden.bs.collapse', function () {
                    $('.wrapper-room').removeClass('active');
                });
                datepicker.bind('datepicker-first-date-selected', function(event, obj)
                {
                    $('.wrapper-check-out').addClass('active');
                    $('.wrapper-check-in').removeClass('active');
                    self.migrateDates(event, obj, true);

                }).bind('datepicker-change', function(event, obj)
                {
                    if ($('.wrapper-check-out').hasClass('active'))
                    {
                        $('.wrapper-check-out').removeClass('active');
                        $('.wrapper-check-in').addClass('active');
                        //$('#bt-datepicker').collapse('hide');
                        //$('#collapseRoomGuest').collapse('show');
                        self.migrateDates(event.currentTarget, obj, true);
                        $('input[name="daterange"]').data('dateRangePicker').setDateRange(obj.date1, obj.date2);
                    }
                });
            });

        },
        loadStoredData: function (self, searchModel, datepicker)
        {
            $(datepicker).data('dateRangePicker').setDateRange(moment(searchModel.dateIn).format('YYYY-MM-DD'), moment(searchModel.dateOut).format('YYYY-MM-DD'));
            var dates = {
                'date1': this.model.get('dateIn'),
                'date2': this.model.get('dateOut')
                // 'date1': searchModel.dateIn,
                // 'date2': searchModel.dateOut
            };
            self.migrateDates(datepicker, dates, false);

            $('#rooms option[value="' + searchModel.numRooms + '"]').prop('selected', true);
            $('#guests option[value="' + searchModel.numGuests + '"]').prop('selected', true);
            self.migrateRooms(searchModel);
        },

        /**
         * @function formatDate
         * @description will automatically format date to according to webshim.activeLang or the browsers locale.
         **/
        migrateDates: function (target, obj, store) {
            var $datepicker,
                value1, value2, formattedCheckIn, formattedCancelFree, formattedCheckOut, days, formattedNights;
            $datepicker = $(target);
            value1 = obj.date1;
            value2 = obj.date2;

            formattedCheckIn = moment(value1).format('ddd MMM DD YYYY');
            formattedCancelFree = moment(value1).subtract(1, 'days').format('ddd MMM DD YYYY');
            formattedCheckOut = moment(value2).format('ddd MMM DD YYYY');

            if (store)
            {
                this.model.set({'dateIn' : formattedCheckIn});
                this.model.set({'cancelFree' : formattedCancelFree});
                this.model.set({'dateOut' : formattedCheckOut ? formattedCheckOut : ''});
                bookingChannel.reply('SearchModel', this.model);
            }
            $('.wrapper-check-in .title').html(formattedCheckIn);

            if (formattedCheckOut)
            {
                days = moment(formattedCheckOut).diff(moment(formattedCheckIn), 'days');
                formattedNights = days > 0 ? (days > 1 ? days + ' Nights' : '1 Night') : '';
                $('.wrapper-check-out .title').html(formattedCheckOut);
                $('.wrapper-check-out .subtitle .nights .value').html(formattedNights);
            }

        },
        /**
         * @function formatDate
         * @description will automatically format date to according to webshim.activeLang or the browsers locale.
         **/
        migrateRooms: function (obj) {
            var $inputRooms,
                $inputGuests,
                rooms, guests, formattedRooms, formattedGuests;
            $inputRooms = $('#rooms');
            $inputGuests = $('#guests');
            rooms = obj.numRooms;
            guests = obj.numGuests;

            formattedRooms = rooms + ' rooms';
            formattedGuests = guests + ' guests';

            $('.wrapper-room .title').html(formattedRooms + ', ' + formattedGuests);
        },

        adjustDates: function (event) {
            var $datepickerIn,
                $datepickerOut,
                momentA,
                momentB;
            $datepickerIn = $('#date-check-in-desktop');
            $datepickerOut = $('#date-check-out-desktop');
            momentA = moment($datepickerIn.val());
            momentB = moment($datepickerOut.val());

            if (momentB.diff(momentA) >= 0) {
                $datepickerOut.val(momentA.format('YYYY-MM-DD'));
            }
        },
        formatDate: function () {
            $('.format-date').each(function () {
                var $display = $('.date-display', this);
                $(this).on('change', function (e) {
                    var localizedDate = webshim.format.date($.prop(e.target, 'value'));
                    $display.html(localizedDate);
                });
            });
        },
        setRooms: function () {
            var roomSelector,
            roomValue;
            roomSelector = $('#rooms option:selected');
            roomValue = roomSelector.text();
            this.model.set({'numRooms' : roomValue});
            bookingChannel.reply('SearchModel', this.model);
            this.migrateRooms(this.model.attributes);
        },
        setGuests: function () {
            var guestSelector,
            guestValue;
            guestSelector = $('#guests option:selected');
            guestValue = guestSelector.text();
            this.model.set({'numGuests' : guestValue});
            bookingChannel.reply('SearchModel', this.model);
            this.migrateRooms(this.model.attributes);
        },
        /**
         * @function showSearchResults
         * @description shows the list of options when you start typing.
         **/
        showSearchResults: function (event) {
            if ($('.search-box input').val().length > 2) {
                //this.changePanes('.list-init, .list-details', '.list-results');
                $('.list-results').addClass('slideDown').slideDown('fast');
                //searchFixed(true);
            } else {
                //this.changePanes('.list-results, .list-details', '.list-init');
                searchFixed(false);
                $(this).updatePolyfill();
            }

            function searchFixed(fixed) {
                var $body = $('body');
                if (fixed) {
                    if (!$body.hasClass('fixedSearch')) {
                        $body.addClass('fixedSearch');
                        $('#menu').addClass('navbar-inverse');
                    }
                } else {
                    if ($body.hasClass('fixedSearch')) {
                        $body.removeClass('fixedSearch');
                        $('#menu').removeClass('navbar-inverse');
                    }
                }
            }
        },
        /**
         * @function changePanes
         * @description This code change the class to show the specific pane you're clicking.
         **/
        changePanes: function (oldPane, newPane) {
            if (!$(newPane).hasClass('slideDown')) {
                $(oldPane).removeClass('slideDown').addClass('slideUp').slideUp('fast', function () {
                    $(newPane).removeClass('slideUp').addClass('slideDown').slideDown('fast');
                    $(this).updatePolyfill();
                });
            }
        },
        /**
         * @function showSearchTrip
         * @description This code shows accordion for room and calendar
         **/
        showSearchTrip: function (event) {
            event.preventDefault();
            this.changePanes('.list-results', '.list-details');
            $('.list-results').addClass('slideUp').slideUp('fast');
            $('.search-box input').val($('.title', this.changePanes).html());
        },
        /**
         * @function toggleSearchCalendar
         * @description This code shows the calendar your clicking to.
         **/
        toggleSearchCalendar: function (event) {
            var self = $(event.currentTarget).closest('a');
            if (Modernizr.touch) {
                $('input[data-date-size="1"]', self).first().click();
            }
        },
        focusInput: function (event) {
            $('.list-home-actions').slideUp();
            this.changeToHeaderInverse();
            //this.scrollTop();
        },
        focusOutInput: function (event) {
            if ($(event.currentTarget).val().length === 0) {
                $('.list-home-actions').slideDown();
                this.changeToHeaderFloating();
            }
        },
        changeToHeaderInverse: function () {
            //Data.disabledWaypointNav();
            //$('#menu').addClass('navbar-inverse');
        },
        changeToHeaderFloating: function () {
            //Data.enableWaypointNav();
            //$('#menu').removeClass('navbar-inverse');
        },
        scrollTop: function () {
            var body = $('html, body');
            body.stop().animate({
                scrollTop: 0
            }, '50000', 'swing', function () {});
        },
        findHotel : function () {
            bookingChannel.reply('SearchModel', this.model);
            $('body').removeClass('fixedSearch');
            Backbone.history.navigate('booking/hotelList' + (this.brandName ? ('/' + this.brandName) : ''), true);
            $(window).scrollTop(0, 0);
            sessionStorage.setItem('SearchModel', JSON.stringify(this.model));
        },
        changeImg: function (query) {
            $('div.coverImage').data('cover', 'assets/img/full_bg1.jpg');
        },
        loadBotContainerData: function () {
            var x = this.promoModel.attributes;
            this.model.set({'promoTitle': x.title});
            this.model.set({'promoDesc' : x.description});
            console.log(x.title);
        },
        prevent : function (event) {
            event.preventDefault();
        },
        template: JST['app/scripts/booking/bookingHome/bookingHome-template.hbs']
    });
});

