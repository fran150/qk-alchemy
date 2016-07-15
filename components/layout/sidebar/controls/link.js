define(['knockout', 'quark', 'text!./link.html'], function(ko, $$, template) {
    // Menu lateral, permite anidar mas menus dentro del contenido submenu
    return $$.component(function(params, $scope) {
        var self = this;

        // Parametros del componente
        $$.parameters({
            // Clase Glyphicon o fontawesome a mostrar como icono
            icon: ko.observable(),
            // Texto del menu
            text: ko.observable('Menu Option'),
            // Url a la que debe redirigir al hacer clic
            url: ko.observable(),
            // Nombre de la ruta
            route: ko.observable(),
            // Si es un submenu indica si esta desplegado o no
            opened: ko.observable(false)
        }, params, [$scope, this]);

        // Devuelve la flecha que debe mostrar en base a si el menu se encuentra desplegado o no
        $scope._arrow = ko.pureComputed(function() {
           return this.opened() ? "glyphicon-menu-down" : "glyphicon-menu-right";
        }, $scope);

        // Cambia de estado el menu deplegando o plegando los submenu
        $scope.toggle = this.toggle = function() {
            self.opened(!self.opened());
        };

        $scope.link = ko.pureComputed(function() {
            if (self.url()) {
                return '#' + self.url();
            } else {
                var route = self.route();

                if (route) {
                    if ($$.isObject(route)) {
                        return '#' + $$.routing.hash(route.name, route.config);
                    } else {
                        return '#' + $$.routing.hash(route);
                    }
                } else {
                    return '#';
                }
            }
        });

    }, template);
});
