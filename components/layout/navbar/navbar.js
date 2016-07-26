define(['knockout', 'quark', 'text!./navbar.html', '../layout'], function(ko, $$, template, LayoutComponent) {
    return $$.component(function(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            link: ko.observable('#'),
            html: ko.observable('Brand'),
            icon: ko.observable()
        }, params, this);

        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the DOM element
            navbarElement = element;

            // Get the main layout component
            var layoutMain = context.$container;

            // Copy main layout component observables to local variables
            if (layoutMain instanceof LayoutComponent.modelType) {
                layoutMain.hasNavbar(true);
            } else {
                self.componentErrors.throw('The navbar component must be used inside a layout component');
            }
        }

        // Return true if an icon is defined
        $scope.visibleIcon = ko.pureComputed(function() {
            return $$.isString(self.icon());
        }, $scope);

        // If the icon url starts with 
        $scope.iconType = ko.pureComputed(function() {
            var icon = self.icon();

            if ($$.isString(icon)) {
                if (icon.substring(0, 4) == 'url:') {
                    return "image";
                } else if (icon.substring(0, 5) == 'font:') {
                    return "font";
                }
            }

            return "unknown";
        }, $scope);

        $scope.iconUrl = ko.pureComputed(function() {
            var type = $scope.iconType();
            var icon = self.icon();

            if (type == "image") {
                return icon.substring(4);
            } if (type == "font") {
                return icon.substring(5);
            } else {
                return icon;
            }
        }, $scope);

        $scope.url = ko.pureComputed(function() {
            var link = self.link();

            if (link.substring(0, 1) == "#") {
                return "#" + $$.routing.hash(link.substring(1));
            } else {
                return link;
            }
        });
    }, template);
});
