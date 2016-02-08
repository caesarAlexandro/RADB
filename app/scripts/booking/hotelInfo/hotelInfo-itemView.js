 /**
 * @ComponentName: Hotel Information Item View
 * @Description: The purpose of this Marionnette Item View object is to add the template, manipulate DOM, listen to
 * the events from the Hotel Information, Booking funnel page.
 **/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'booking/hotelInfo/data/hotelInfo-model',
    'common/utility/misc/data',
    'templates'
], function ($, _, Backbone, Marionette, Handlebars, HotelInfoModel, Data, JST) {
    'use strict';
    var query;
    return Marionette.ItemView.extend({
        initialize : function () {
            Handlebars.registerPartial('hotelDescription',
                                       JST['app/scripts/booking/hotelInfo/utility/partials/hotelDescription-partialTemplate.hbs']);
            Handlebars.registerPartial('tripadvisorIcon',
                                       JST['app/scripts/common/utility/partials/tripadvisorIcon-partialTemplate.hbs']);
            Handlebars.registerPartial('map',
                                       JST['app/scripts/common/utility/partials/map-partialTemplate.hbs']);
            Handlebars.registerPartial('bookNow',
                                       JST['app/scripts/booking/hotelInfo/utility/partials/bookNow-partialTemplate.hbs']);
            Handlebars.registerPartial('tripadvisorReview',
                                       JST['app/scripts/booking/hotelInfo/utility/partials/tripadvisorReview-partialTemplate.hbs']);
            Handlebars.registerPartial('hotelImages',
                                       JST['app/scripts/booking/hotelInfo/utility/partials/hotelImages-partialTemplate.hbs']);
            Handlebars.registerPartial('hotelMap',
                                       JST['app/scripts/booking/hotelInfo/utility/partials/hotelMap-partialTemplate.hbs']);
            Handlebars.registerPartial('carousel',
                                       JST['app/scripts/booking/hotelInfo/utility/partials/carousel-partialTemplate.hbs']);
            Handlebars.registerPartial('mobileButtons',
                                       JST['app/scripts/booking/hotelInfo/utility/partials/mobileButtons-partialTemplate.hbs']);
        },
        serializeData : function () {
            var currentRoute = Backbone.history.getFragment();
            return _.extend({
                currentPage : currentRoute,
                heading : 'ROOM, BEDS AND PAYMENT'
            }, this.model.toJSON());
        },
        renderCarousel : function() {
            $('#hotelinfo-carousel').owlCarousel({
                navigation : true, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true
            });
        },
        //devComment The model attribute in a future should get their data from the HotelList page.

        template :  JST['app/scripts/booking/hotelInfo/hotelInfo-template.hbs']
    });
});
