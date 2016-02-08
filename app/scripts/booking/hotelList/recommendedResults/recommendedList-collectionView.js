/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'booking/hotelList/recommendedResults/recommendedList-itemView',
    'templates'
], function ($, _, Backbone, Marionette, Handlebars, RecommendedListItemView, JST) {
    'use strict';
    return Marionette.CollectionView.extend({
        childView : RecommendedListItemView
    });
});
