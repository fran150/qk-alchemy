define(['quark'], function($$) {
    $$.formatters.fecha = function(value) {
        if (value) {
            var date = value.substring(0,10);

            var año = value.substr(0,4);
            var mes = value.substr(5,2);
            var dia = value.substr(8,2);

            if (($$.isDefined(año)) && ($$.isDefined(mes)) && ($$.isDefined(dia))) {
                return dia + "/" + mes + "/" + año;
            }
        }
    }
});
