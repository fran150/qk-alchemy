/**
    @component Shows a button on the navbar. It must be used inside an al-layout-navbar
    component as virtual.
*/
define([
    'knockout',
    'quark',
    'text!./button.component.html',
    '../../../lib/utils',
    '../navbar.component'
], function(ko, $$, template, utils, Navbar) {

    function LayoutNavbarButtonComponent(params, $scope) {
        var self = this;

        $$.parameters({
            /**
                @parameter string Text to show on the button
                @observable @exposed
            */
            text: ko.observable('Navbar Button'),
            /**
                @parameter string Class of the icon font to show on the element
                @observable @exposed
            */
            iconFont: ko.observable('glyphicon glyphicon-star'),
            /**
                @parameter bool True if the button must show as active on the navbar
                @observable @exposed
            */
            active: ko.observable(false),
            /**
                @parameter callback Called when the user clicks on the button
            */
            onClick: function() {}
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

        $scope.click = function() {
            $$.call(self.onClick);
        }
    }

    return $$.component(LayoutNavbarButtonComponent, template);
});
