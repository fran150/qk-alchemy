define(['knockout', 'quark', 'text!./header.component.html',
        'qk-alchemy/lib/utils',
        '../dropdown.component'],
       function(ko, $$, template, utils, NavbarDropdown) {

    function LayoutNavbarDropdownHeaderComponent(params, $scope) {
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
                throw new Error('This component must be used inside an al-layout-navbar-dropdown component');
            }
        }
    }

    return $$.component(LayoutNavbarDropdownHeaderComponent, template);
});
