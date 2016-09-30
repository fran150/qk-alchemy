define(['knockout', 'quark', 'text!./navbar.html', 'qk-alchemy/lib/utils', '../layout'], function(ko, $$, template, utils, LayoutComponent) {
    function Navbar(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            routeName: ko.observable(),
            routeParams: ko.observable(),
            brand: ko.observable('Brand Name'),
            icon: ko.observable()
        }, params, this);

        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the main layout component
            var layoutMain = utils.findContainer(context, LayoutComponent.modelType);;

            // Set the main layout component hasNavbar property to true
            if (layoutMain) {
                layoutMain.hasNavbar(true);
            } else {
                throw new Error('The navbar component must be used inside an al-layout component');
            }
        }

        // Return true if an icon is defined
        $scope.visibleIcon = ko.pureComputed(function() {
            return $$.isString(self.icon());
        }, $scope);

        // Get the icon type, font or image based on the icon property
        // first chars
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

        // Based on icon type returns the icon Url or class
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
            var routeName = self.routeName();
            var routeParams = self.routeParams();

            if (routeName) {
                return $$.routing.link(routeName, routeParams);
            }
        });
    }

    return $$.component(Navbar, template);
});
