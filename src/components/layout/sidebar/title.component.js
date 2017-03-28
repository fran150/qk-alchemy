/**
    @component Shows a title on the sidebar. It must be used inside an
    al-layout-sidebar component.
*/
define([
    'knockout',
    'quark',
    'text!./title.component.html',
    '../../../lib/utils',
    '../sidebar.component'
], function(ko, $$, template, utils, Sidebar) {

    function LayoutSidebarTitleComponent(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            /**
                @parameter string Font icon class to show
                @observable @exposed
            */
            iconFont: ko.observable('glyphicon glyphicon-star'),
            /**
                @parameter string Title text
                @observable @exposed
            */
            text: ko.observable('Menu Title')
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, Sidebar.modelType);

            // Check if its a Sidebar component
            if (!container) {
                throw new Error('This component must be used inside an al-sidebar component');
            }
        }
    }

    return $$.component(LayoutSidebarTitleComponent, template);
});
