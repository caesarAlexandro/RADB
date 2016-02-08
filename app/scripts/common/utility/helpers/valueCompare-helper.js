 /**
 * @ComponentName: If Conditional Helper
 * @Description: The purpose of helper is to compare two parameters and trigger an action if they have the same value.
 **/

define(['handlebars'], function(Handlebars) {
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    })
});
