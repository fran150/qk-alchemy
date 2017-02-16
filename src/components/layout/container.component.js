define([
    'knockout',
    'quark',
    'text!./container.component.html',
    '../../lib/utils',
    '../layout.component'
], function(ko, $$, template, utils, LayoutComponent) {

    function LayoutContainerComponent(params, $scope, $imports) {
        var self = this;

        // The page has navbar
        var hasNavbar = ko.observable();
        // The page has sidebar
        var hasSidebar = ko.observable();
        // The page has submenu
        var hasSubmenu = ko.observable();

        // Layout values that can be overriden by parameters
        var layout = {
            // Stores the sidebar size observable of the layout component
            sidebarSize: ko.observable(),
            // Stores the container size observable of the layout component
            containerSize: ko.observable(),
            // Is container fluid?
            containerFluid: ko.observable(),
        };

        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the main layout component
            var layoutMain = utils.findContainer(context, LayoutComponent.modelType);

            // If a main layout is defined
            if (layoutMain) {
                // Copy main layout component observables to local variables
                hasNavbar = layoutMain.hasNavbar;
                hasSidebar = layoutMain.hasSidebar;
                hasSubmenu = layoutMain.hasSubmenu;
                layout.sidebarSize = layoutMain.sidebarSize;
                layout.containerSize = layoutMain.containerSize;
                layout.containerFluid = layoutMain.containerFluid;

                // Inject values specified in local parameters
                $$.inject(params, layout);

                // Publish properties of the layout as local properties of this model
                self.containerSize = layout.containerSize;
                self.containerFluid = layout.containerFluid;
            } else {
                throw Error('The al-layout-container component must be used inside an al-layout component');
            }
        }

        $scope.styles = ko.pureComputed(function() {
            var styles = {};

            styles.marginTop = 0;

            if (hasNavbar()) {
                styles.marginTop += 50;
            }

            if (hasSubmenu()) {
                styles.marginTop += 40;
            }

            styles.marginTop += "px";

            return styles;
        })

        $scope.sidebarStyle = ko.pureComputed(function() {
            var styles = {};

            if (hasSidebar()) {
                styles.paddingLeft = layout.sidebarSize();

                if (layout.containerFluid()) {
                    styles.paddingLeft += 15;
                }

                styles.paddingLeft += "px";
            }

            return styles;
        });

        // Clases que se deben aplicar al elemento para que se muestre como corresponde.
        $scope.classes = ko.pureComputed(function() {
            var res = "container";

            if (layout.containerFluid()) {
                res += "-fluid";
            }

            return res;
        });

        // Clases que se deben aplicar al elemento para que se muestre como corresponde.
        $scope.sidebarClass = ko.pureComputed(function() {
            if (hasSidebar()) {
                return "with-sidebar-col-" + layout.containerSize();
            }

            return "";
        });

    }

    return $$.component(LayoutContainerComponent, template);
});
