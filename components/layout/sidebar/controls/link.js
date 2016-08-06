define(['knockout', 'quark', 'text!./link.html'], function(ko, $$, template) {
    // Menu lateral, permite anidar mas menus dentro del contenido submenu
    return $$.component(function(params, $scope) {
        var self = this;

        // Parametros del componente
        $$.parameters({
            // Clase Glyphicon o fontawesome a mostrar como icono
            icon: ko.observable('glyphicon glyphicon-star'),
            // Texto del menu
            text: ko.observable('Menu Option'),
            // Nombre de la ruta
            routeName: ko.observable(),
            // Configuracion de la ruta
            routeParams: ko.observable(),
            // Si es un submenu indica si esta desplegado o no
            opened: ko.observable(false)
        }, params, this);

        // Devuelve la flecha que debe mostrar en base a si el menu se encuentra desplegado o no
        $scope.arrow = ko.pureComputed(function() {
           return self.opened() ? "glyphicon-menu-down" : "glyphicon-menu-right";
        }, $scope);

        // Cambia de estado el menu deplegando o plegando los submenu
        this.toggle = function() {
            self.opened(!self.opened());
        };

        $scope.click = function() {
            $$.redirect($scope.url());
        }

        $scope.url = ko.pureComputed(function() {
            var routeName = self.routeName();
            var routeParams = self.routeParams();

            if (routeName) {
                return $$.routing.link(routeName, routeParams);
            } else {
                return "#";
            }
        });

    }, template);
});
