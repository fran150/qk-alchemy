define([
    'quark',
    'knockout',
    'text!./submenu.component.html',
    '../../lib/utils',
    '../layout.component'
], function($$, ko, template, utils, LayoutComponent) {

    function SubmenuComponent(params, $scope, $imports) {
        var self = this;

        // Indicates if the layout has a navbar
        var hasNavbar;
        // Indicates if the layout has a sidebar
        var hasSidebar;
        // Indicates if the layout has submenu
        var hasSubmenu;

        // Container bootstrap's size (when breaks to the top of page)
        var containerSize = ko.observable();

        // Sidebar size in pixels
        var sidebarSize;

        // True if container is fluid
        var containerFluid;

        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the main layout component
            var layoutMain = utils.findContainer(context, LayoutComponent.modelType);;

            // If a layout component is found
            if (layoutMain) {
                hasNavbar = layoutMain.hasNavbar;
                hasSidebar = layoutMain.hasSidebar;
                hasSubmenu = layoutMain.hasSubmenu;
                sidebarSize = layoutMain.sidebarSize;
                containerSize = layoutMain.containerSize;
                containerFluid = layoutMain.containerFluid;

                // Set the submenu flag to true on the layout component
                layoutMain.hasSubmenu(true);
            } else {
                throw new Error('The submenu component must be used inside an al-layout component');
            }
        }

        $scope.styles = ko.pureComputed(function() {
            var styles = {};

            styles.left = 0;

            if (hasSidebar()) {
                styles.left += sidebarSize();

                if (containerFluid()) {
                    styles.left += 15;
                }

                styles.left += "px";
            }

            return styles;
        });

        // Devuelve las clases que se deben aplicar en base al tamaño del sidebar
        $scope.classes = ko.pureComputed(function() {
            return "submenu-col-" + containerSize();
        });

        $scope.dispose = function() {
            hasSubmenu(false);
        }
    }

    return $$.component(SubmenuComponent, template);
});
