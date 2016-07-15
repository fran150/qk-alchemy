define(['knockout', 'quark', 'text!./sidebar.html', '../layout'],
       function(ko, $$, template, LayoutComponent) {
    // Menu lateral
    return $$.component(function(params, $scope) {
        var self = this;

        var elem;

        $scope.resizing = ko.observable(false);

        this.sidebarSize = ko.observable();
        $scope.containerSize = ko.observable();

        $scope.init = function(element, viewModel, context) {
            var layoutMain = context.$child;

            if (context && layoutMain) {
                if (layoutMain instanceof LayoutComponent.modelType) {
                    self.sidebarSize = layoutMain.sidebarSize;
                    $scope.containerSize = layoutMain.containerSize;
                }
            }

            $(element).on('mousedown', function(event) {
                debugger;
            });
        }

        // Al mover el mouse si esta en actualizando el tamaño del sidebar, setea el tamaño del mismo a la posicion del mouse
        $(window).on('mousemove', function(event) {
            if ($scope.resizing()) {
                self.sidebarSize(event.pageX + 35);
            }
        });

        // Posicion absoluta desde la izquierda del boton de cambiar el tamaño del sidebar
        $scope.resizerLeft = ko.pureComputed(function() {
            return self.sidebarSize() - 35 + "px";
        });

        // Ancho a aplicar al sidebar
        $scope.width = ko.pureComputed(function() {
            return self.sidebarSize() + "px";
        });

        // Invocada al hacer clic en el boton de resize
        $scope.startResizing = function(e) {
            $scope.resizing(true);
        }

        // Al soltar el boton del mouse no importa donde sea, marcar que no se esta cambiando el tamaño del sidebar y guardar el
        // tamaño actual en local storage
        $(document).on('mouseup', function() {
            if ($scope.resizing()) {
                $scope.resizing(false);
                localStorage.save('sidebar-size');
            }
        });

        // Clases a aplicar en base al tamaño del sidebar, el contenendor principal y el punto de quiebre en donde se desea
        // que el componente se reacomode en la parte superior de la pantalla
        $scope.classes = ko.pureComputed(function() {
            return "sidebar-col-" + $scope.containerSize();
        });
    }, template);
});
