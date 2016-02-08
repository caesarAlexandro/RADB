/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'booking/hotelList/currentBranchResults/currentBranchList-itemView',
    'templates'
], function ($, _, Backbone, Marionette, Handlebars, CurrentBranchListItemView, JST) {
    'use strict';
    return Marionette.CollectionView.extend({
        childView : CurrentBranchListItemView
    });
});
