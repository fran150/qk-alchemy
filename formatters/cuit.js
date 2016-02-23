define(['quark'], function($$){
    $$.formatters.cuit = function(value) {
        if (value) {
            var str = value.toString();
            if (str.length == 11) {
                return str.substr(0, 2) + "-" + str.substr(2, 8) + "-" + str.substr(10, 1);
            }
        }
    }
});
