define(['knockout', 'quark', 'text!./link.html', '../navbar'], function(ko, $$, template, Navbar) {
    function NavbarLink(params, $scope) {
        var self = this;

        $$.parameters({
            routeName: ko.observable(),
            routeParams: ko.observable(),
            iconFont: ko.observable('glyphicon glyphicon-star'),
            text: ko.observable('Navbar Link')
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = context.$container;

            // Check if its a Navbar component
            if (!(container instanceof Navbar.modelType)) {
                self.componentErrors.throw('This component must be used inside an al-navbar component');
            }
        }

        $scope.url = ko.pureComputed(function() {
            var routeName = self.routeName();
            var routeParams = self.routeParams();

            if (routeName) {
                return $$.routing.link(routeName, routeParams);
            }
        }, $scope);

        $scope.isActive = ko.pureComputed(function() {
            var current = $$.routing.current();

            if (current.config.fullName == self.routeName()) {
                return true;
            }

            return false;
        }, $scope);
    }

    return $$.component(NavbarLink, template);
});
