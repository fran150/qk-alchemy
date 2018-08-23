/**
    @component Shows a divider line on the al-navbar-dropdown component.
*/
define([
    'knockout',
    'quark',
    'text!./divider.component.html',
    '../../../../lib/utils',
    '../dropdown.component',
    '../mega-dropdown.component'
], function(ko, $$, template, utils, NavbarDropdown, MegaDropdown) {

    function LayoutNavbarDropdownDividerComponent(params, $scope) {
        var self = this;

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, NavbarDropdown.modelType);
            var container2 = utils.findContainer(context, MegaDropdown.modelType);

            // Check if its a Navbar component
            if (!container && !container2) {
                throw new Error('This component must be used inside an al-layout-navbar-dropdown component');
            }
        }
    }

    return $$.component(LayoutNavbarDropdownDividerComponent, template);
});
