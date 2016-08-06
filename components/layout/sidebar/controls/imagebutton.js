define(['knockout', 'quark', 'text!./imagebutton.html'], function(ko, $$, template) {
    // Boton de imagen de la barra lateral
    return $$.component(function(params, $scope) {
        var self = this;

        // Parametros del componente
        $$.parameters({
            // Nombre de la ruta que se debe invocar al hacer clic en el boton
            routeName: ko.observable(),
            // Parametros de la ruta que se deve invocar al hacer clic en el boton
            routeParams: ko.observable(),
            // Clase glyphicon o fontawesome del icono a mostrar
            icon: ko.observable('glyphicon glyphicon-star'),
            // Texto del elemento
            text: ko.observable('Button')
        }, params, this);

        // Tamaño del sidebar
        $scope.sidebarSize = ko.observable();

        // Al inicializar el componente toma los tamaños del sidebar y el contenedor principal del componente padre
        // Esto permite aplicar los estilos que corresponden en base al tamaño de ambos elementos
        $scope.init = function(element, viewModel, context) {
            var container = context.$containerContext.$container;

            if (container) {
                if (container.sidebarSize) {
                    self.sidebarSize = container.sidebarSize;
                }
            }
        }

        $scope.ocultarTexto = ko.pureComputed(function() {
            if (self.sidebarSize() < 85) {
                return true;
            }

            return false;
        });


        // Se dispara al hacer clic en el elemento, redirige a la url de la ruta
        $scope.click = function() {
            $$.redirect($scope.url());
        }

        // Devuelve la url de la ruta especificada
        $scope.url = ko.pureComputed(function() {
            // Si se especifico un nombre de ruta devuelvo el hash correspondiente a la ruta,
            // sino devuelvo el hash vacio
            var routeName = self.routeName();
            var routeParams = self.routeParams();

            if (routeName) {
                var url = $$.routing.link(routeName, routeParams);
                return url;
            }

            return "";
        }, $scope);

    }, template);
});
