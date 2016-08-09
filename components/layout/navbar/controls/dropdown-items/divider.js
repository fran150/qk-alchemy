define(['knockout', 'quark', 'text!./divider.html', '../dropdown'], function(ko, $$, template, NavbarDropdown) {
    function NavbarDropdownDivider(params, $scope) {
        var self = this;

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

    return $$.component(NavbarDropdownDivider, template);
});
