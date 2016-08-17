define(['knockout', 'quark', 'text!./link.html', '../sidebar'], function(ko, $$, template, Sidebar) {
    function SidebarLink(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            // Font icon class to show
            iconFont: ko.observable('glyphicon glyphicon-star'),
            // Text of the menu
            text: ko.observable('Menu Option'),
            // Route name
            routeName: ko.observable(),
            // Route parameters
            routeParams: ko.observable(),
            // True if the menu is opened showing submenus
            opened: ko.observable(false)
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
                self.componentErrors.throw('This component must be used inside an al-sidebar or an al-sidebar-link component');
            }
        }

        // Glyphicon of the arrow to show if the component is opened or not
        $scope.arrow = ko.pureComputed(function() {
           return self.opened() ? "glyphicon-menu-down" : "glyphicon-menu-right";
        }, $scope);

        // Toggles the menu state
        this.toggle = function() {
            self.opened(!self.opened());
        };

        // The the user clicks on the div redirect to the url
        $scope.click = function() {
            var link = $scope.url();

            if (link) {
                $$.redirect(link);
            }
        }

        // Returns the url given the route name and parameters
        $scope.url = ko.pureComputed(function() {
            var routeName = self.routeName();
            var routeParams = self.routeParams();

            if (routeName) {
                return $$.routing.link(routeName, routeParams);
            } else {
                return "";
            }
        });
    }

    return $$.component(SidebarLink, template);
});
