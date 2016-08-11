define(['knockout', 'quark', 'text!./container.html', './layout'], function(ko, $$, template, LayoutComponent) {
    return $$.component(function(params, $scope) {
        var self = this;

        this.hasNavbar = ko.observable();
        // The page has sidebar
        this.hasSidebar = ko.observable();
        // Stores the sidebar size observable of the layout component
        this.sidebarSize = ko.observable();
        // Stores the container size observable of the layout component
        this.containerSize = ko.observable();

        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the DOM element
            sidebarElement = element;

            // Get the main layout component
            var layoutMain = context.$container;

            // Copy main layout component observables to local variables
            if (layoutMain instanceof LayoutComponent.modelType) {
                self.hasNavbar = layoutMain.hasNavbar;
                self.hasSidebar = layoutMain.hasSidebar;
                self.sidebarSize = layoutMain.sidebarSize;
                self.containerSize = layoutMain.containerSize;
            } else {
                self.componentErrors.throw('The al-layout-container component must be used inside an al-layout component');
            }
        }


        $scope.topMargin = ko.pureComputed(function() {
            if (self.hasNavbar()) {
                return "50px";
            }
        });

        $scope.leftMargin = ko.pureComputed(function() {
            if (self.hasSidebar()) {
                return self.sidebarSize() + "px";
            }
        });

        // Clases que se deben aplicar al elemento para que se muestre como corresponde.
        $scope.classes = ko.pureComputed(function() {
            if (self.hasSidebar()) {
                return "with-sidebar-col-" + self.containerSize();
            }
        });
    }, template);
});
