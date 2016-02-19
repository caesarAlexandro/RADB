 /**
  * @ComponentName: Room and Payment Item View
  * @Description: This Item View is to render, maniplate DOM, add model for the Guest Information Webpage.
  **/
 define([
     'jquery',
     'underscore',
     'backbone',
     'marionette',
     'handlebars',
     'common/utility/misc/validator-utility',
     'common/utility/misc/data',
     'templates',
     'common/utility/helpers/valueCompare-helper'
 ], function($, _, Backbone, Marionette, Handlebars, Validator, Data, JST) {
     'use strict';
     var brandName,
         beds,
         rooms,
         views,
         addons,
         arrangements,
         selectedRoom,
         selectedBed,
         selectedView,
         selectedArrangement,
         selectedAddOn;
     return Marionette.ItemView.extend({
         /**
          * @function initialize
          * @description Add the Partials for payment information and add the attribute paymentFill  to indetify if the
          * form is completed
          */
         initialize: function(option) {
             Handlebars.registerPartial('guestInformation',
                 JST['app/scripts/booking/roomPayment/guestInfo/guestInfo-partialTemplate.hbs']);
             Handlebars.registerPartial('typeRoom',
                 JST['app/scripts/booking/roomPayment/chooseRoom/typeRoom-partialTemplate.hbs']);
             Handlebars.registerPartial('typeBed',
                 JST['app/scripts/booking/roomPayment/chooseRoom/typeBed-partialTemplate.hbs']);
             Handlebars.registerPartial('payment',
                 JST['app/scripts/booking/roomPayment/payment/payment-partialTemplate.hbs']);
             Handlebars.registerPartial('reviewBook',
                 JST['app/scripts/booking/roomPayment/reviewBook/reviewBook-partialTemplate.hbs']);
             Handlebars.registerPartial('summaryReservation',
                 JST['app/scripts/booking/roomPayment/summaryReservation/summaryReservation-partialTemplate.hbs']);
             Handlebars.registerPartial('rewards',
                 JST['app/scripts/booking/roomPayment/rewards/rewards-partialTemplate.hbs']);
             brandName = option.brand;
             this.model.set({
                 'selectedRoom': 'Guest'
             });
             this.model.set({
                 'selectedBed': 'Queen'
             });
             this.model.set({
                 'selectedView': 'City'
             });
             this.model.set({
                 'selectedArrangement': 'Standard'
             });
             this.model.set({
                 'selectedAddOn': 'None'
             });
             this.model.set({
                 'email': ''
             });

             beds = ['Queen', 'King'];
             rooms = ['Guest', 'Business', 'Suite'];
             views = ['City', 'Park'];
             arrangements = ['Standard', 'Corner'];
             addons = ['Balcony', 'Accesible', 'None'];
             selectedRoom = function() {
                 for (var i = 0; i < 3; i++) {
                     if ($('#radio-list-room-' + i)[0].checked) {
                         return rooms[i];
                     }
                 }
             };
             selectedArrangement = function() {
                 for (var i = 0; i < 2; i++) {
                     if ($('#radio-list-arrangement-' + i)[0].checked) {
                         return arrangements[i];
                     }
                 }
             };
             selectedBed = function() {
                 for (var i = 0; i < 2; i++) {
                     if ($('#radio-list-bed-' + i)[0].checked) {
                         return beds[i];
                     }
                 }
             };
             selectedView = function() {
                 for (var i = 0; i < 2; i++) {
                     if ($('#radio-list-view-' + i)[0].checked) {
                         return views[i];
                     }
                 }
             },
             selectedAddOn = function() {
                 for (var i = 0; i < 3; i++) {
                     if ($('#radio-list-addon-' + i)[0].checked) {
                         return addons[i];
                     }
                 }
             };
             this.updateBill();
             if ($('#signOut').hasClass('hidden') == false) {
                 this.setDefaultClientInfo();
             }
         },
         template: JST['app/scripts/booking/roomPayment/roomPayment-template.hbs'],
         serializeData: function() {
             var currentRoute = Backbone.history.getFragment();
             return _.extend({
                 currentPage: currentRoute
             }, this.model.toJSON());
         },
         events: {
             'blur #firstname': 'validateFisrtName',
             'blur #lastname': 'validateLastName',
             'blur #email': 'validateEmail',
             'blur #telephone': 'validatePhone',
             'blur #zipcode': 'validateZipCode',
             'keyup #zip': 'setClientInfo',
             'click .btn-reservation': 'setCardInfo',
             // 'click .btn-reservation': 'creditCardLastDigits',
             'click .list-cc': 'setCardInfo',
             'click #radio-list-room-0': 'changeRoomSelection',
             'click #radio-list-room-1': 'changeRoomSelection',
             'click #radio-list-room-2': 'changeRoomSelection',
             'click #radio-list-bed-0': 'changeBedSelection',
             'click #radio-list-bed-1': 'changeBedSelection',
             'click #radio-list-view-0': 'changeViewSelection',
             'click #radio-list-view-1': 'changeViewSelection',
             'click #radio-list-arrangement-0': 'changeViewArrangement',
             'click #radio-list-arrangement-1': 'changeViewArrangement',
             'click #radio-list-addon-0': 'changeViewAddOn',
             'click #radio-list-addon-1': 'changeViewAddOn',
             'click #radio-list-addon-2': 'changeViewAddOn',
             'click #completeReservation': 'makeReservation',
             'click .joinnow': 'openCarlsonClub',
             'click .closeform': 'openCarlsonClub',
             'click .cls': 'closeAlert'
         },
         modelEvents: {
             'change': 'modelChanged'
         },
         setDefaultClientInfo: function() {
             this.model.set({'firstName' : 'Curt'});
             this.model.set({'lastName' : 'Jackson'});
             this.model.set({'email' : 'cj294@aol.com'});
             this.model.set({'phoneNumber' : '5555555555'});
             this.model.set({'country' : 'United States'});
             this.model.set({'zip': '12345'});
         },
         openCarlsonClub: function () {
             $('.triangle').toggle();
             $('.carlsonform').slideToggle(200);
         },
         closeAlert: function () {
             $('.alertmsg ').hide(200);
         },
         setClientInfo: function() {
             var firstname = $('#firstname').val();
             var lastname = $('#lastname').val();
             var email = $('#email').val();
             var telephone = $('#telephone').val();
             var country = $('#country').val();
             var zipcode = $('#zip').val();
             if (zipcode.length > 4) {
                 this.model.set({
                     'firstName': firstname
                 });
                 this.model.set({
                     'lastName': lastname
                 });
                 this.model.set({
                     'email': email
                 });
                 this.model.set({
                     'phoneNumber': telephone
                 });
                 this.model.set({
                     'country': country
                 });
                 this.model.set({
                     'zip': zipcode
                 });
             }

         },
         updateBill: function() {
             this.model.set('taxPrice', ((this.model.get('price') * 0.08).toFixed(2)));
             this.model.set('totalPrice', (this.model.get('price') * 1.08).toFixed(2));
         },
         changeRoomSelection: function() {
             this.model.set({
                 'selectedRoom': selectedRoom()
             });
             var currentPrice = this.model.get('price');
             // if (selectedRoom() === 'Deluxe') {
             //     var deluxePrice = parseInt(currentPrice) + 20;
             //     this.model.set({
             //         'price': deluxePrice
             //     });
             //     this.updateBill();
             // } else {
             //     var guestPrice = parseInt(currentPrice) - 20;
             //     this.model.set({
             //         'price': guestPrice
             //     });
             //     this.updateBill();
             // }
         },
         changeViewSelection: function() {
             this.model.set({
                 'selectedView': selectedView()
             });
         },
         changeViewArrangement: function() {
             this.model.set({
                 'selectedArrangement': selectedArrangement()
             });
         },
         changeBedSelection: function() {
             var currentPrice = this.model.get('price');
             var queenPrice;
             var kingPrice;
             var doublePrice;

             this.model.set({
                 'selectedBed': selectedBed()
             });
             if (selectedBed() === 'Queen') {
                 if (selectedRoom() === 'Guest') {
                     queenPrice = 120 + 15;
                 } else {
                     queenPrice = 140 + 15;
                 }
                 this.model.set({
                     'price': queenPrice
                 });
                 this.updateBill();
             } else if (selectedBed() === 'King') {
                 if (selectedRoom() === 'Guest') {
                     kingPrice = 120 + 30;
                 } else {
                     kingPrice = 140 + 30;
                 }
                 this.model.set({
                     'price': kingPrice
                 });
                 this.updateBill();
             } else {
                 if (selectedRoom() === 'Guest') {
                     doublePrice = 120;
                 } else {
                     doublePrice = 140;
                 }
                 this.model.set({
                     'price': doublePrice
                 });
                 this.updateBill();
             }
         },
         changeViewAddOn: function() {
             this.model.set({
                 'selectedAddOn': selectedAddOn()
             });
         },
         setCardInfo: function() {
             var cardname;
             var cardNum = $('#ccNumber').val();
             var expMonth = $('#expMonth').val();
             var expYear = $('#expYear').val();
             var creditCardInfo = {
                 cardName: 'Visa',
                 cardNumber: cardNum,
                 expirationMonth: expMonth,
                 expirationYear: expYear
             };
             this.model.set({
                 'creditCardInfo': creditCardInfo
             });

             this.creditCardLastDigits();
         },
         creditCardLastDigits: function() {
             var cardNum = this.model.get('creditCardInfo').cardNumber;
             var lastFour = cardNum.substr(cardNum.length - 4);
             this.model.set({
                 'lastCardDigits': lastFour
             });
         },
         /**
          * @function validateFisrtName
          * @description Print true or false if  the $('#firstname') value match like a validate name
          */
         modelChanged: function() {
             this.render();
         },
         /**
          * @function validateLastName
          * @description [Print true or false if the $('#laststname') value match like a validate last name ]
          **/
         validateLastName: function() {
             console.log(Validator.name($('#lastname').val()));
         },
         /**
          * @function validateEmail
          * @description [Print true or false if  the $('#email') value match like a validate email ]
          */
         validateEmail: function() {
             console.log(Validator.email($('#email').val()));
         },
         /**
          * @function validatePhone
          * @description [Print true or false if  the $('#firstname') value match like a validate Phone number ]
          */
         validatePhone: function() {
             console.log(Validator.phoneNumber($('#telephone').val()));
         },
         /**
          * @function validateZipCode
          * @description [Print true or false if  the $('#firstname') value match like a validate zip code ]
          */
         validateZipCode: function() {
             console.log(Validator.zipCode($('#zipcode').val()));
         },
         /**
          * @function makeReservation
          * @description After the user click on #completeReservation button, the fuction will send to the confirmation page.
          */
         makeReservation: function() {
             Backbone.history.navigate('booking/confirmation' + ((brandName ? ('/' + brandName) : '')), true);
             $(window).scrollTop(0, 0);
         },
         returningGuest: function() {
             var signedIn = $('#signOut');
             if (signedIn.hasClass('hidden') == false) {
                 setTimeout(function() {
                     $('#returnGuest').removeClass('hidden');
                     $('.rewardcurt').removeClass('hidden');
                     $('.rewardadriana').addClass('hidden');
                 }, 100);
                 this.model.set({
                     'selectedRoom': 'Suite'
                 });
                 this.model.set({
                     'selectedBed': 'King'
                 });
                 this.model.set({
                     'selectedArrangement': 'Standard'
                 });
                 this.model.set({
                     'selectedView': 'Park'
                 });
                 this.model.set({
                     'selectedAddOn': 'Balcony'
                 });
             }
         },
         onRender: function() {
             Data.fullBg('[data-cover]');
             this.returningGuest();
         }
     });
 });
