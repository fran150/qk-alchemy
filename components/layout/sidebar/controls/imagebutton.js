define(['knockout', 'quark', 'text!./imagebutton.html', 'qk-alchemy/lib/utils', '../sidebar'], function(ko, $$, template, utils, Sidebar) {
    function SidebarImageButton(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            // Name of the route to redirect when clicking on the button
            pageName: ko.observable(),
            // Route parameters
            pageParams: ko.observable(),
            // Font icon class to show
            icon: ko.observable('glyphicon glyphicon-star'),
            // Option text
            text: ko.observable('Button'),
            // Hide button text when sidebar width is less than this
            hideTextAt: ko.observable(85)
        }, params, this);

        // Store sidebarSize observable from the sidebar component
        var sidebarSize = ko.observable();

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, Sidebar.modelType);

            // Check if its a Sidebar component
            if (container) {
                // Get the sidebar size observable
                if (container.sidebarSize) {
                    sidebarSize = container.sidebarSize;
                }
            } else {
                throw new Error('This component must be used inside an al-sidebar component');
            }
        }

        // Applies an style that hides the button text when size is narrower
        // than this
        $scope.hideText = ko.pureComputed(function() {
            if (sidebarSize() < self.hideTextAt()) {
                return true;
            }

            return false;
        });


        // When the user clicks on the div redirect to the url
        $scope.click = function() {
            var link = $scope.url();
            if (link) {
                $$.redirect(link);
            }
        }

        // Creates the url with the given route name and config
        $scope.url = ko.pureComputed(function() {
            var pageName = self.pageName();
            var pageParams = self.pageParams();

            if (pageName) {
                return '#' + $$.routing.hash(pageName, pageParams);
            } else {
                return "";
            }
        });
    }

    return $$.component(SidebarImageButton, template);
});
