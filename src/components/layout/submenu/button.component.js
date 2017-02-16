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
            // Font icon class to show
            iconFont: ko.observable('glyphicon glyphicon-floppy-disk'),
            // Text of the menu
            text: ko.observable('Button'),
            // Route name
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
