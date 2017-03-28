/**
    @component Shows a dropdown button on the navbar. It must be used inside an al-layout-navbar
    component as virtual.
*/
define([
    'knockout',
    'quark',
    'text!./dropdown.component.html',
    '../../../lib/utils',
    '../navbar.component'
], function(ko, $$, template, utils, Navbar) {

    function LayoutNavbarDropdownComponent(params, $scope) {
        var self = this;

        $$.parameters({
            /**
                @parameter string Class of the icon font to show on the element
                @observable @exposed
            */
            iconFont: ko.observable('glyphicon glyphicon-star'),
            /**
                @parameter string Text to show on the link
                @observable @exposed
            */
            text: ko.observable('Dropdown'),
            /**
                @parameter bool True if the button must show as active on the navbar
                @observable @exposed
            */
            active: ko.observable(false)
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, Navbar.modelType);

            // Check if its a Navbar component
            if (!container) {
                throw new Error('This component must be used inside an al-layout-navbar component');
            }
        }
    }

    return $$.component(LayoutNavbarDropdownComponent, template);
});
