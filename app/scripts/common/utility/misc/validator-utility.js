/**
* @ComponentName: Form Validator
* @description Javascript object that has define the functions to validate that the different form components
* follow the expected data format.
*/

define([
], function () {

    var nameRegEx = /^[A-Za-z ]+$/,
        emailRegEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        phoneRegEx = /^\+?([0-9])?\(?([0-9]{3})\)?[-, ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        zipCodeRegEx = /^[0-9]{5,6}$/;

    return {
        /**
         * @function name
    	 * @description validate that the the data receives is trully a string by using the nameRegEx.
    	 */
        name: function (name) {
            return nameRegEx.test(name);
        },
        /**
         * @function email
    	 * @description validate that the the data receives is trully a email by using the emailRegEx.
    	 */
        email: function(email) {
            return emailRegEx.test(email);
        },
        /**
         * @function phone
    	 * @description validate that the the data receives is trully a phone number by using the phoneRegEx.
    	 */
        phoneNumber: function (phone) {
            return phoneRegEx.test(phone);
        },
        /**
         * @function phone
    	 * @description validate that the the data receives is trully a zipCode by using the zipCodeRegEx.
    	 */
        zipCode: function (zipCode) {
            return zipCodeRegEx.test(zipCode);
        }
    }
});
