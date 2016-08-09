define(['knockout', 'quark', 'text!./header.html', '../dropdown'], function(ko, $$, template, NavbarDropdown) {
    function NavbarDropdownHeader(params, $scope) {
        var self = this;

        $$.parameters({
            text: ko.observable('Header')
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = context.$container;

            // Check if its a Navbar component
            if (!(container instanceof NavbarDropdown.modelType)) {
                self.componentErrors.throw('This component must be used inside an al-navbar-dropdown component');
            }
        }
    }

    return $$.component(NavbarDropdownHeader, template);
});
