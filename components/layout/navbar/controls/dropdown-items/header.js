define(['knockout', 'quark', 'text!./header.html', 'qk-alchemy/lib/utils', '../dropdown'], function(ko, $$, template, utils, NavbarDropdown) {
    function NavbarDropdownHeader(params, $scope) {
        var self = this;

        $$.parameters({
            text: ko.observable('Header')
        }, params, this);

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

    return $$.component(NavbarDropdownHeader, template);
});
