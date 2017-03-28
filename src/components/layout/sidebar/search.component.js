/**
    @component Show a textbox and a search button on the sidebar menu. It must be
    used inside an al-layout-sidebar component.
*/
define([
    'knockout',
    'quark',
    'text!./search.component.html',
    '../../../lib/utils',
    '../sidebar.component'
], function(ko, $$, template, utils, Sidebar) {

    function LayoutSidebarSearchComponent(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            /**
                @parameter string Value of the textbox
                @observable @exposed
            */
            value: ko.observable(''),
            /**
                @parameter string Placeholder of the textbox
                @observable @exposed
            */
            placeholder: ko.observable('Search...'),
            /**
                @parameter string Bootstrap style of the button
                @observable @exposed
            */
            style: ko.observable('default'),
            /**
                @parameter callback Called when the user clicks on the button
                @exposed
            */
            onSearch: function(texto) {}
        }, params, this);

        // On form submit call search event
        $scope.search = function() {
            $$.call(self.onSearch, self.value());
        };

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, Sidebar.modelType);

            // Check if its a Sidebar component
            if (!container) {
                throw new Error('This component must be used inside an al-layout-sidebar component');
            }
        }

        // Button's bootstrap class
        $scope.btnClass = ko.pureComputed(function() {
            var style = self.style();

            switch (style) {
                case 'danger':
                case 'warning':
                case 'success':
                case 'primary':
                    return "btn-" + style;
                    break;
                default:
                    return "btn-default";
            }
        }, $scope);
    }

    return $$.component(LayoutSidebarSearchComponent, template);
});
