define(['knockout', 'quark', 'text!./divider.html', 'qk-alchemy/lib/utils', '../dropdown'], function(ko, $$, template, utils, NavbarDropdown) {
    function NavbarDropdownDivider(params, $scope) {
        var self = this;

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, NavbarDropdown.modelType);

            // Check if its a Navbar component
            if (!container) {
                throw new Error('This component must be used inside an al-navbar-dropdown component');
            }
        }
    }

    return $$.component(NavbarDropdownDivider, template);
});
