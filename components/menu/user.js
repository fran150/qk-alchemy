define(['knockout', 'quark', 'text!./user.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            usuario: ko.observable('P044117'),
            imagen: ko.observable('http://intranet/recursoshumanos/miespacio/fotos/P044117.jpg'),
            nombre: ko.observable('Francisco Luis'),
            apellido: ko.observable('López'),
            CUIL: ko.observable('20292402288'),
            nacimiento: ko.observable('09/03/1982'),
            mail: ko.observable('fllopez@bpba.com.ar'),
            unidad: ko.observable('1049'),
            unidadSuperior: ko.observable('1000'),
            gerencia: ko.observable('1000')
        }, params, this);

        $scope.nombreCompleto = ko.pureComputed(function() {
            if (self.apellido() && self.nombre()) {
                return self.apellido() + ', ' + self.nombre();
            }

            if (self.apellido()) {
                return self.apellido()
            }

            if (self.nombre()) {
                return self.nombre();
            }

            return "Nombre Desconocido";
        });

    }, template);
});
