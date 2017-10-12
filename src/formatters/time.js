define([
    'quark',
    'knockout'
], function($$, ko) {

    $$.formatters.dateFromDB = function(value) {
        if (value) {
            var año = value.substr(0,4);
            var mes = value.substr(5,2);
            var dia = value.substr(8,2);

            if (($$.isDefined(año)) && ($$.isDefined(mes)) && ($$.isDefined(dia))) {
                return dia + "/" + mes + "/" + año;
            }
        }
    }

    $$.formatters.dateTimeFromDB = function(value) {
        if (value) {
            var año = value.substr(0,4);
            var mes = value.substr(5,2);
            var dia = value.substr(8,2);

            var hora = value.substr(11, 8);

            if (($$.isDefined(año)) && ($$.isDefined(mes)) && ($$.isDefined(dia)) && ($$.isDefined(hora))) {
                return dia + "/" + mes + "/" + año + " " + hora;
            }
        }
    }

    $$.formatters.timeFromDB = function(value) {
        var result = "";

        if (value != null) {
            var time = value.split(':');

            var hour = parseInt(time[0]);
            var mins = parseInt(time[1]);

            if (hour > 0) {
                result += hour;

                if (hour > 1) {
                    result += " hrs ";
                } else {
                    result += " hr ";
                }
            }

            result += mins + " min";
        }

        return result;
    }

    $$.formatters.intCuit = {
        read: function(value) {
            if (value) {
                var str = value.toString();

                if (str.length == 11) {
                    return str.substr(0, 2) + "-" + str.substr(2, 8) + "-" + str.substr(10, 1);
                }
            }
        },
        write: function(value) {
            if ($$.isString(value)) {
                if (value.length == 13) {
                    var tipo = value.substr(0, 2);
                    var doc = value.substr(3, 8);
                    var verif = value.substr(12, 1);

                    return parseInt(tipo + doc + verif);
                }
            }
        }
    }
})
