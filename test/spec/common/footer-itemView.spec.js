/*
@name:Unit Test for Main Footer
@description:Unit Test for Main Footer of the Application */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'common/footer/footer-itemView'
], function ($, _, Backbone, Marionette, MainFooter) {
    'use strict';
    describe('Main footer of the Booking app', function () {
        beforeEach(function () {
            this.view = new MainFooter();
            this.view.render();
        });
        it('Footer was initialized', function () {
            this.view.should.equal(this.view);
        });

    });
});

