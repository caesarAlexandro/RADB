/**
 * Created by jesus.lira on 10/07/2015.
 */
/*
 @name:Unit Test for Main Nav
 @description:Unit Test for Main Nav of the Application */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'common/navigation/nav-itemView',
], function ($, _, Backbone, Marionette, MainNav) {
    'use strict';
    describe('Main Nav of the Booking app', function () {
        beforeEach(function () {
            this.view = new MainNav();
            this.view.render();
        }); 
        it('Nav was initialized', function () {
            this.view.should.equal(this.view);
        });
        it('Should Change url to #/findHotel when you make click in Find a Hotel', function () {
            this.view.$el.find('a[href=\'#/findHotel\']')[0].click();
            expect(location.hash).to.equal('#/findHotel');            
        });
        it('Should change url to #deals when you make click in Deals', function () {
            this.view.$el.find('a[href=\'#/deals\']')[0].click();            
            expect(location.hash).to.equal('#/deals');
        });
        it('Should change url to #meetingEvents when you make click in Meeting Events', function () {
            this.view.$el.find('a[href=\'#/meetingEvents\']')[0].click();            
            expect(location.hash).to.equal('#/meetingEvents');
        });
        it('Should change url to #clubCarlson when you make click on Club Carlson', function() {
            this.view.$el.find('a[href=\'#/clubCarlson\']')[0].click();
            expect(location.hash).to.equal('#/clubCarlson');
        });
    });
});
