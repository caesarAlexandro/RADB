/* jshint ignore:start */
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'booking/hotelInfo/hotelInfo-itemView',
], function ($, _, Backbone, Marionette, HotelInfo) {
    'use strict';
    describe('Hotel Information Header Test Suite', function () {
        
        beforeEach(function () {
            this.view = new HotelInfo();
            this.view.render();
        }); 

        describe ('Navigation Bar Test Suite', function(){
            it('Should navigation bar exist', function(done){
                expect($('#menu')).exist;
                done(); 
            });
        });
        

        describe('Page Header Body Test Suite', function(){

            it('Should page header body exist', function(done){
                expect($('.page-header-body')).exist;
                done(); 
            });

            it('Should page-header-body have an element h5', function(done){
                expect($('.page-header-body h5')).exist;
                expect($('.page-header-body h5')).not.to.be.empty;
                done(); 
            });

            it('Should page-header-body have an element h3', function(done){
                expect($('.page-header-body h3')).exist;
                expect($('.page-header-body h3')).not.to.be.empty;
                done(); 
            });

            it('Should page-header-body have an element div', function(done){
                expect($('.page-header-body div')).exist;
                expect($('.page-header-body div')).not.to.be.empty;
                done(); 
            });  
            it('Should element trip advisor image', function(done){
                expect($('#Kusp6iG459')).exist;
                expect($('#Kusp6iG459')).not.to.be.empty;
                done(); 
            }); 
           
        }); //Page Header Test Suite

        describe('Page Header Cta Test Suite', function(){

            it ('Should Page Header Cta exists', function(done){
                expect($('.page-header-cta')).exist;
                 expect($('.page-header-cta')).not.to.be.empty;
                done();
            }); 
           
            it('Should have elements Button Book Now', function(done){
                expect($('.page-header-cta .btn-primary label')).exist;
                done(); 
            });
        }); //Page Header Cta Test Suite

    });//describe Header
    describe ('Hotel Information Body-Content Test Suite', function(){

        beforeEach(function () {
            this.view = new HotelInfo();
            this.view.render();
        }); 

        it('Should headlabel exist', function(done){
            expect($('.head-label')).exist;
            expect($('.head-label')).not.to.be.empty;
            done();     
        });

        describe ('Hotel Info Content Pane Test Suite', function(){

            it ('Should Hotel Info Panel exists', function(done){
                expect($('.hotel-info-content-pane')).exist;
                done();
            }); 


            it ('Should Amenities List exists', function(done){
                expect($('.amenities-list')).exist;
                done();
            }); 

             it ('Should Reviews List exists', function(done){
                expect($('.reviews')).exist;
                done();
            });        
        });

        it ('Should have a map', function (done){
            expect($('.maps iframe')).exist;
            done(); 
        }); 

        it('Should hotel info imges exists', function(done){
            expect($('.hotel-info-image')).exist;
            done(); 
        }); 


       
    }); //describe Body
    
});
/* jshint ignore:end */
