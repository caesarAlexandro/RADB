/**
* @ComponentName CollectionView Name
* @Description The purpose of this Marionnette Collection View object is to add the template, manipulate DOM, listen to
 * the events, and render process for the XXXXXXX
**/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'handlebars',
    'app/scripts/templates/itemView'
], function ($, _, Backbone, Marionette, Handlebars, CollectionItemView) {
    'use strict';
    return Marionette.CollectionView.extend({
        childView : CollectionItemView
    });
});
