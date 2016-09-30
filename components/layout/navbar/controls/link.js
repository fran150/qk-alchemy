define(['knockout', 'quark', 'text!./link.html', 'qk-alchemy/lib/utils', '../navbar'], function(ko, $$, template, utils, Navbar) {
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
            // Get the main layout component
            var container = utils.findContainer(context, Navbar.modelType);;

            // Check if its a Navbar component
            if (!(container instanceof Navbar.modelType)) {
                throw new Error('This component must be used inside an al-navbar component');
            }
        }

        $scope.url = ko.pureComputed(function() {
            var routeName = self.routeName();
            var routeParams = self.routeParams();

            if (routeName) {
                return '#' + $$.routing.hash(routeName, routeParams);
            }
        }, $scope);

        $scope.isActive = ko.pureComputed(function() {
            var current = $$.routing.current();

            if (current == self.routeName()) {
                return true;
            }

            return false;
        }, $scope);
    }

    return $$.component(NavbarLink, template);
});
