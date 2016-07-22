define(['knockout', 'quark', 'text!./navbar.html', '../layout'], function(ko, $$, template, LayoutComponent) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            url: ko.observable('#'),
            html: ko.observable('Brand'),
            icon: ko.observable()
        }, params, [this, $scope]);

        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the DOM element
            navbarElement = element;

            // Get the main layout component
            var layoutMain = context.$container;

            // Copy main layout component observables to local variables
            if (layoutMain instanceof LayoutComponent.modelType) {
/*                layout.containerSize = layoutMain.containerSize;
                layout.hasNavbar = layoutMain.hasNavbar;*/
                layoutMain.hasNavbar(true);
            } else {
                self.componentErrors.throw('The navbar component must be used inside a layout component');
            }
        }


        $scope.visibleIcon = ko.pureComputed(function() {
            return $$.isString(self.icon());
        }, $scope);

        $scope.iconType = ko.pureComputed(function() {
            if ($$.isString(self.icon())) {
                if (self.icon().substring(0, 4) == 'url:') {
                    return "image";
                } else if (self.icon().substring(0, 5) == 'font:') {
                    return "font";
                }
            }

            return "unknown";
        }, $scope);

        $scope.iconUrl = ko.pureComputed(function() {
            if ($scope.iconType() == "image") {
                return self.icon().substring(4);
            } if ($scope.iconType() == "font") {
                return self.icon().substring(5);
            } else {
                return self.icon();
            }
        }, $scope);
    }, template);
});
