/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'templates',
    'common/utility/misc/validator-utility',
    'common/utility/helpers/valueCompare-helper'
], function ($, _, Backbone, Marionette, JST, Validator) {
    'use strict';
    /**
     *  @class  GuestInfo-Pane-View
     *  @description Is on charge of show guest informatio
     */
    return Marionette.ItemView.extend({
        template :  JST['app/scripts/booking/roomPayment/guestInfo/guestInfo-template.hbs'],
        events:{
            'blur #firstname':'validateFisrtName',
            'blur #lastname':'validateLastName',
            'blur #email':'validateEmail',
            'blur #telephone': 'validatePhone',
            'blur #zipcode': 'validateZipCode',
            'click .joinnow': 'openCarlsonClub'
        },
        initialize: function () {
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        /**
         * @function validateFisrtName
         * @description Print true or false if  the $('#firstname') value match like a validate name
         * @memberOf  GuestInfo-Pane-View
         */
        validateFisrtName: function () {
            console.log(Validator.name($('#firstname').val()));
        },
        /**
         * @function validateLastName
         * @description [Print true or false if the $('#laststname') value match like a validate last name ]
         * @memberOf  GuestInfo-Pane-View
         */
        validateLastName:function () {
            console.log(Validator.name($('#lastname').val()));
        },
        /**
         * @function validateEmail
         * @description [Print true or false if  the $('#firstname') value match like a validate email ]
         * @memberOf  GuestInfo-Pane-View
         */
        validateEmail: function () {
            console.log(Validator.email($('#email').val()));
        },
        /**
         * @function validatePhone
         * @description [Print true or false if  the $('#firstname') value match like a validate Phone number ]
         * @memberOf  GuestInfo-Pane-View
         */
        validatePhone: function () {
            console.log(Validator.phoneNumber($('#telephone').val()));
        },
        /**
         * @function validateZipCode
         * @description [Print true or false if  the $('#firstname') value match like a validate zip code ]
         * @memberOf  GuestInfo-Pane-View
         */
        validateZipCode: function () {
            console.log(Validator.zipCode($('#zipcode').val()));
        }
    });

});
