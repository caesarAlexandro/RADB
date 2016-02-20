/**
* @ComponentName Model for GuestInformation.
* @Description This model will store all the guest information about the user.
**/

define([
    'underscore',
    'backbone',
    'booking/hotelList/data/currentBranchList-model'
] , function (_, Backbone, CurrentBranchListModel) {
    'use strict';
    return Backbone.Collection.extend({
        /**
         * @description url for the service that brings the hotel search
         **/
        url: function() {
            return this.queries[this.current];
        },
        model: CurrentBranchListModel,
        comparator: function(model) {
            return model.get('miles');
        },
        parse: function (response) {
            return response;
        },
        initialize: function (query) {
            // var url2 = 'http://analopez-test.apigee.net/xbsservicemockup/hoteldata?ql=select%20*%20where%20cityname%20=%20%27chicago%27%20and%20hotelbrandcode%20=%20%27RADR%27';
            var url1 = 'http://acnjrkickerbxhca6smut.devcloud.acquia-sites.com/rest/hotels/?args[0]=IL&args[1]=3'
            this.queries = [url1];
            this.current = query;
            this.deferred = this.fetch({
                dataType: 'jsonp'
            });
        },
        sortByMiles: function(model) {
            return model.get('miles');
        },
        sortByPrice: function(model) {
            return model.get('price');
        },
        sortByRating: function(model) {
            return model.get('rating');
        },
        sortByMilesReverse: function(model) {
            return -(model.get('miles'));
        },
        sortByPriceReverse: function(model) {
            return -(model.get('price'));
        },
        sortByRatingReverse: function(model) {
            return -(model.get('rating'));
        },
        changeComparatorToMiles: function()
        {
            if (this.comparator === this.sortByMiles) {
                this.comparator = this.sortByMilesReverse;
            } else {
                this.comparator = this.sortByMiles;
            }
        },
        changeComparatorToPrice: function()
        {
            if (this.comparator === this.sortByPrice) {
                this.comparator = this.sortByPriceReverse;
            } else {
                this.comparator = this.sortByPrice;
            }
        },
        changeComparatorToRating: function()
        {
            if (this.comparator === this.sortByRating) {
                this.comparator = this.sortByRatingReverse;
            } else {
                this.comparator = this.sortByRating;
            }
        }
    })
});
