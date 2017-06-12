/**
    @component <p>Shows a link on the sidebar. It must be used inside an al-layout-sidebar
    component as virtual.
    You can specify submenu by nesting this elements inside a virtual tag</p>
    lt;al-layout-sidebar-link&gt;
        lt;!-- submenu --&gt;
            lt;al-layout-sidebar-link virtual&gt;
            lt;/al-layout-sidebar-link&gt;
        lt;!-- /submenu --&gt;
    lt;/al-layout-sidebar-link&gt;
    @allowContent
*/
define([
    'knockout',
    'quark',
    'text!./link.component.html',
    '../../../lib/utils',
    '../sidebar.component'
], function(ko, $$, template, utils, Sidebar) {

    function LayoutSidebarLinkComponent(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            /**
                @parameter string Class of the icon font to show on the element
                @observable @exposed
            */
            iconFont: ko.observable('glyphicon glyphicon-star'),
            /**
                @parameter string Text to show
                @observable @exposed
            */
            text: ko.observable('Menu Option'),
            /**
                @parameter string Page to link when the user clicks on the element
                @observable @exposed
            */
            pageName: ko.observable(),
            /**
                @parameter string Page parameters
                @observable @exposed
            */
            pageParams: ko.observable(),
            /**
                @parameter bool If the link has submenus returns if the dropdown is opened
                showing the child elements
            */
            opened: ko.observable(false)
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, [Sidebar.modelType, LayoutSidebarLinkComponent]);

            // Check if its a Sidebar component or a sidebar link
            if (!container) {
                throw new Error('This component must be used inside an al-layout-sidebar or an al-layout-sidebar-link component');
            }
        }

        // Glyphicon of the arrow to show if the component is opened or not
        $scope.arrow = ko.pureComputed(function() {
           return self.opened() ? "glyphicon-menu-down" : "glyphicon-menu-right";
        }, $scope);

        // Toggles the menu state
        this.toggle = function() {
            self.opened(!self.opened());

            $scope.click();
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
            var pageName = self.pageName();
            var pageParams = self.pageParams();

            if (pageName) {
                return '#' + $$.routing.hash(pageName, pageParams);
            } else {
                return "";
            }
        });
    }

    return $$.component(LayoutSidebarLinkComponent, template);
});
