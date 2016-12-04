define(['knockout', 'quark', 'text!./divider.component.html',
        'qk-alchemy/lib/utils',
        '../dropdown.component'],
       function(ko, $$, template, utils, NavbarDropdown) {

    function LayoutNavbarDropdownDividerComponent(params, $scope) {
        var self = this;

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, NavbarDropdown.modelType);

            // Check if its a Navbar component
            if (!container) {
                throw new Error('This component must be used inside an al-layout-navbar-dropdown component');
            }
        }
    }

    return $$.component(LayoutNavbarDropdownDividerComponent, template);
});
