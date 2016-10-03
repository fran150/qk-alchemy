define(['knockout', 'quark', 'qk-alchemy/lib/utils', 'text!./search.html', '../Sidebar'], function(ko, $$, utils, template, Sidebar) {
    function SidebarSearch(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            // Component value
            value: ko.observable(''),
            // Placeholder text
            placeholder: ko.observable('Search...'),
            // Button's bootstrap type
            style: ko.observable('default'),
            // Search event
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
                throw new Error('This component must be used inside an al-sidebar component');
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

    return $$.component(SidebarSearch, template);
});
