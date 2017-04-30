/**
    @component Shows a link in the al-navbar-dropdown component. Allows the user to click on the option
    redirecting the browser to a specific page.
*/
define([
    'knockout',
    'quark',
    'text!./link.component.html',
    '../../../../lib/utils',
    '../dropdown.component'
], function(ko, $$, template, utils, NavbarDropdown) {

    function LayoutNavbarDropdownLinkComponent(params, $scope) {
        var self = this;

        $$.parameters({
            /**
                @parameter string Page name to redirect on click
                @observable @exposed
            */
            pageName: ko.observable(),
            /**
                @parameter object An object where each property is the name of a page parameter
                and contains its value
                @observable @exposed
            */
            pageParams: ko.observable(),
            /**
                @parameter string Class of the icon font to show on the element
                @observable @exposed
            */
            iconFont: ko.observable('glyphicon glyphicon-star'),
            /**
                @parameter string Text to show on the element.
                @observable @exposed
            */
            text: ko.observable('Navbar Link'),
            /**
                @parameter bool True if the item must be disabled, false otherwise.
            */
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
