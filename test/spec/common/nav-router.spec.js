/*global define, describe, it, beforeEach */

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'common/navigation/navMain-router'
], function ($, _, Backbone, Marionette, Router) {
    'use strict';
    describe('Primary  Navmenu routing', function () {
        beforeEach(function () {

            this.router = new Router();
             /* jshint ignore:start */
            this.routeSpy = sinon.spy();
            /* jshint ignore:end */
            try {
                Backbone.history.start({silent:true});
            } catch(e) {}
            this.router.navigate('elsewhere');


        });
        it('Find Hotel is accessible on nav menu', function () {
            this.router.bind('route:booking', this.routeSpy);
            this.router.navigate('booking', true);
            console.log(this.routeSpy.calledOnce);
            expect(this.routeSpy.calledOnce).to.equal(true);
        });
        it('Deals is accessible on nav menu', function () {
            this.router.bind('route:deals', this.routeSpy);
            this.router.navigate('deals', true);
            console.log(this.routeSpy.calledOnce);
            expect(this.routeSpy.calledOnce).to.equal(true);
        });
        it('Meeting Events is accessible on nav menu', function () {
            this.router.bind('route:meetingEvents', this.routeSpy);
            this.router.navigate('meetingEvents', true);
            console.log(this.routeSpy.calledOnce);
            expect(this.routeSpy.calledOnce).to.equal(true);
        });
        it('Club Carlson Events is accessible on nav menu', function () {
            this.router.bind('route:clubCarlson', this.routeSpy);
            this.router.navigate('clubCarlson', true);
            console.log(this.routeSpy.calledOnce);
            expect(this.routeSpy.calledOnce).to.equal(true);
        });
    });
});

