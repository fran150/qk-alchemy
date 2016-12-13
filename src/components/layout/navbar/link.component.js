define([
    'knockout',
    'quark',
    'text!./link.component.html',
    '../../../lib/utils',
    '../navbar.component'
], function(ko, $$, template, utils, Navbar) {

    function LayoutNavbarLinkComponent(params, $scope) {
        var self = this;

        $$.parameters({
            pageName: ko.observable(),
            pageParams: ko.observable(),
            iconFont: ko.observable('glyphicon glyphicon-star'),
            text: ko.observable('Navbar Link')
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Get the main layout component
            var container = utils.findContainer(context, Navbar.modelType);;

            // Check if its a Navbar component
            if (!(container instanceof Navbar.modelType)) {
                throw new Error('This component must be used inside an al-layout-navbar component');
            }
        }

        $scope.url = ko.pureComputed(function() {
            var pageName = self.pageName();
            var pageParams = self.pageParams();

            if (pageName) {
                return '#' + $$.routing.hash(pageName, pageParams);
            }
        }, $scope);

        $scope.isActive = ko.pureComputed(function() {
            var current = $$.routing.current();

            if (current == self.pageName()) {
                return true;
            }

            return false;
        }, $scope);
    }

    return $$.component(LayoutNavbarLinkComponent, template);
});
