 /**
 * @ComponentName: Footer Router for Application
 * @Description: The goal for this component is to describe the Routes for the footer of the application and associate them
 * with their function.
 **/

define([
    'jquery',
    'backbone',
    'marionette',
    'common/footer/footer-controller'
], function ($, Backbone, Marionette, mainController) {
    'use strict';
    return Marionette.AppRouter.extend({
        controller: mainController,
        appRoutes: {
            'travelAgents': 'travelAgents',
            'development': 'development',
            'afiiliates': 'affiliates',
            'career': 'career',
            'contactUs': 'contactUs',
            '': 'default'
        }
    });

});
