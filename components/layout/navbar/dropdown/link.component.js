define(['knockout', 'quark', 'text!./link.component.html',
        'qk-alchemy/lib/utils',
        '../dropdown.component'],
       function(ko, $$, template, utils, NavbarDropdown) {

    function LayoutNavbarDropdownLinkComponent(params, $scope) {
        var self = this;

        $$.parameters({
            pageName: ko.observable(),
            pageParams: ko.observable(),
            iconFont: ko.observable('glyphicon glyphicon-star'),
            text: ko.observable('Navbar Link'),
            disabled: ko.observable(false)
        }, params, this);

        var dropdownActive = ko.observable();

        function checkActive() {
            var current = $$.routing.current();

            if (current == self.pageName()) {
                dropdownActive(true);
                return true;
            }

            return false;
        }

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, NavbarDropdown.modelType);

            // Check if its a Navbar component
            if (container) {
                dropdownActive = container.active;
                checkActive();
            } else {
                throw new Error('This component must be used inside an al-layout-navbar-dropdown component');
            }
        }

        $scope.url = ko.pureComputed(function() {
            var pageName = self.pageName();
            var pageParams = self.pageParams();

            if (pageName) {
                return '#' + $$.routing.hash(pageName, pageParams);
            }
        }, $scope);

        $scope.isActive = ko.computed(function() {
            return checkActive();
        }, $scope);

        $scope.dispose = function() {
            $scope.isActive.dispose();
        }
    }

    return $$.component(LayoutNavbarDropdownLinkComponent, template);
});
