define(['knockout', 'quark', 'text!./link.html', '../dropdown'], function(ko, $$, template, NavbarDropdown) {
    function NavbarDropdownLink(params, $scope) {
        var self = this;

        $$.parameters({
            routeName: ko.observable(),
            routeParams: ko.observable(),
            iconFont: ko.observable('glyphicon glyphicon-star'),
            text: ko.observable('Navbar Link'),
            disabled: ko.observable(false)
        }, params, this);

        var dropdownActive = ko.observable();

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = context.$container;

            // Check if its a Navbar component
            if (container instanceof NavbarDropdown.modelType) {
                dropdownActive = container.active;
                checkActive();
            } else {
                self.componentErrors.throw('This component must be used inside an al-navbar-dropdown component');
            }
        }

        $scope.url = ko.pureComputed(function() {
            var routeName = self.routeName();
            var routeParams = self.routeParams();

            if (routeName) {
                return $$.routing.link(routeName, routeParams);
            }
        }, $scope);

        function checkActive() {
            var current = $$.routing.current();

            if (current.config.fullName == self.routeName()) {
                dropdownActive(true);
                return true;
            }

            return false;
        }

        $scope.isActive = ko.computed(function() {
            return checkActive();
        }, $scope);

        $scope.dispose = function() {
            $scope.isActive.dispose();
        }
    }

    return $$.component(NavbarDropdownLink, template);
});
