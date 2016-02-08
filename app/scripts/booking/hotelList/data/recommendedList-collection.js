/*@name : Model for SearchList.
@description : This model will display a list of recommended hotels.
*/
define([
    'underscore',
    'backbone',
    'booking/hotelList/data/recommendedList-model'
] , function (_, Backbone, RecommendedListModel) {
    'use strict';
    return Backbone.Collection.extend({
        /**
         * @description url for the service that brings the recommended hotels
         **/
        url: function() {
            return this.queries[this.recommended];
        },
        comparator: function(model) {
            return model.get('miles');
        },
        model: RecommendedListModel,
        parse: function (response) {
            return response;
        },
        initialize: function (query) {
            var baseurl = 'http://analopez-test.apigee.net/xbsservicemockup/hoteldata';
            var url1 = baseurl + '?ql=select%20*%20where%20cityname%20=%20%27chicago%27%20and%20isradred%20=%20false';
            var basequery = 'ql=select%20*%20where%20cityname%20=%20%27chicago%27%20'
            var url2 = baseurl + '?' + basequery + 'and%20(hotelbrandcode%20=%20%27RADR%27%20or%20hotelbrandcode%20=%20%27RADB%27%20or%20hotelbrandcode%20=%20%27RADG%27)';
            this.queries = [url1, url2];
            this.recommended = query;
            this.deferred = this.fetch();
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
                return 'reverse';
            } else {
                this.comparator = this.sortByMiles;
                return 'active';
            }
        },
        changeComparatorToPrice: function()
        {
            if (this.comparator === this.sortByPrice) {
                this.comparator = this.sortByPriceReverse;
                return 'reverse';
            } else {
                this.comparator = this.sortByPrice;
                return 'active';
            }
        },
        changeComparatorToRating: function()
        {
            if (this.comparator === this.sortByRating) {
                this.comparator = this.sortByRatingReverse;
                return 'reverse';
            } else {
                this.comparator = this.sortByRating;
                return 'active';
            }
        }
    })
});
