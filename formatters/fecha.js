define(['quark'], function($$) {
    $$.formatters.fecha = function(value) {
        if (value) {
            var año = value.substr(0,4);
            var mes = value.substr(5,2);
            var dia = value.substr(8,2);

            if (($$.isDefined(año)) && ($$.isDefined(mes)) && ($$.isDefined(dia))) {
                return dia + "/" + mes + "/" + año;
            }
        }
    }

    $$.formatters.fechaHora = function(value) {
        if (value) {
            var año = value.substr(0,4);
            var mes = value.substr(5,2);
            var dia = value.substr(8,2);

            var time = value.substr(11,8);

            return dia + "/" + mes + "/" + año + ' ' + time;
        }
    }
});
