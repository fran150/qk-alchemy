define(['knockout', 'quark', 'text!./title.html', '../sidebar'], function(ko, $$, template, Sidebar) {
    function SidebarTitle(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            // Font icon class to show
            iconFont: ko.observable('glyphicon glyphicon-star'),
            // Text of the title
            text: ko.observable('Menu Option')
        }, params, this);

        // Store sidebarSize observable from the sidebar component
        var sidebarSize = ko.observable();

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = context.$container;

            // Check if its a Sidebar component
            if (container instanceof Sidebar.modelType || container instanceof SidebarLink) {
                // Get the sidebar size observable
                if (container.sidebarSize) {
                    sidebarSize = container.sidebarSize;
                }
            } else {
                self.componentErrors.throw('This component must be used inside an al-sidebar component');
            }
        }
    }

    return $$.component(SidebarTitle, template);
});
