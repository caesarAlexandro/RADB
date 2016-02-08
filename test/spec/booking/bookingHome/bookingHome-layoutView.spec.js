define([
	'jquery',
	'underscore',
	'backbone',  
	'marionette',
    'booking/common/booking-layoutView'
], function ($, _, Backbone, Marionette, BookingHomeLayoutView) {
	'use strict';
	
    describe('Booking Home Layout', function () {
		beforeEach(function () {
			this.view = new BookingHomeLayoutView();
			this.view.render();
		});
		it('Should have a section with id modifySearch',function () {
			expect(this.view.$el.find('#modifySearch').length).to.equal(1);
        });
        it('Should have a section with id filter',function () {
			expect(this.view.$el.find('#filter').length).to.equal(1);
        });
        it('Should have a section with class page-header',function () {
			expect(this.view.$el.find('.page-header').length).to.equal(1);
        });
        it('Should have a section with id content-page',function () {
			expect(this.view.$el.find('#content-page').length).to.equal(1);
        });
		
		
	});
});
		