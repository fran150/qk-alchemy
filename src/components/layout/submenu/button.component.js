/**
    @component Shows a button on the submenu. It must be used inside a
    al-layout-submenu component.
*/
define([
    'knockout',
    'quark',
    'text!./button.component.html',
    '../../../lib/utils',
    '../submenu.component'
], function(ko, $$, template, utils, Submenu) {

    function LayoutSubmenuButtonComponent(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            /**
                @parameter string Font icon class to show
                @observable @exposed
            */
            iconFont: ko.observable('glyphicon glyphicon-floppy-disk'),
            /**
                @parameter string Text to show on the button
                @observable @exposed
            */
            text: ko.observable('Button'),
            /**
                @parameter callback Called when the user clicks on the button
                @exposed
            */
            onClick: function() { }
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, Submenu.modelType);

            // Check if its a Sidebar component or a sidebar link
            if (!container) {
                throw new Error('This component must be used inside an al-layout-submenu component');
            }
        }

        // The the user clicks on the div redirect to the url
        $scope.click = function() {
            $$.call(self.onClick);
        }
    }

    return $$.component(LayoutSubmenuButtonComponent, template);
});
