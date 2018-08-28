/**
    @component Defines the navbar of the page. It must be used inside a al-layout
    component. This component allows to define the elements that shows on the page's
    navbar. It can define two virtual containers, left and right, elements on each
    container will be aligned respectively. <br/>
    For example: <br/>
    <code-highlight params="language: 'html'">
        &lt;al-layout&gt;
            &lt;al-layout-navbar&gt;
                &lt;-- left --&gt;
                    <al-layout-navbar-link params="text: 'Left Aligned'" virtual>
                    </al-layout-navbar-link>
                &lt;-- /left --&gt;
                &lt;-- right --&gt;
                    <al-layout-navbar-link params="text: 'Right Aligned'" virtual>
                    </al-layout-navbar-link>
                &lt;-- /right --&gt;
            &lt;/al-layout-navbar&gt;
        &lt;/al-layout&gt;
    </code-highlight>
    All components inside the navbar must be virtual
    @allowContent
*/
define([
    'knockout',
    'quark',
    'text!./navbar.component.html',
    '../../lib/utils',
    '../layout.component'
], function(ko, $$, template, utils, LayoutComponent) {

    function LayoutNavbarComponent(params, $scope) {
        var self = this;

        var hasNavbar;

        // Component's parameters
        $$.parameters({
            /**
                @parameter string Page name to link when the user clicks on the brand
                @observable @exposed
            */
            pageName: ko.observable(),
            /**
                @parameter object Object with parameters values for the link when the user
                clicks on the brand. Empty if the page hasn't parameters.
            */
            pageParams: ko.observable(),
            /**
                @parameter string Brand name to show on the navbar
            */
            brand: ko.observable('Brand Name'),
            /**
                @parameter string URL to the icon to show on the brand
            */
            icon: ko.observable(),
            /**
                @parameter bool If true the navbar will show black
            */
           inverse: ko.observable(false)
        }, params, this);

        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the main layout component
            var layoutMain = utils.findContainer(context, LayoutComponent.modelType);;

            // Set the main layout component hasNavbar property to true
            if (layoutMain) {
                hasNavbar = layoutMain.hasNavbar;
                hasNavbar(true);
            } else {
                throw new Error('The navbar component must be used inside an al-layout component');
            }
        }

        $scope.navbarClass = ko.pureComputed(function() {
            return self.inverse() ? "navbar-inverse" : "navbar-default";
        }, $scope);

        // Return true if an icon is defined
        $scope.visibleIcon = ko.pureComputed(function() {
            return $$.isString(self.icon());
        }, $scope);

        // Get the icon type, font or image based on the icon property
        // first chars
        $scope.iconType = ko.pureComputed(function() {
            var icon = self.icon();

            if ($$.isString(icon)) {
                if (icon.substring(0, 4) == 'url:') {
                    return "image";
                } else if (icon.substring(0, 5) == 'font:') {
                    return "font";
                }
            }

            return "unknown";
        }, $scope);

        // Based on icon type returns the icon Url or class
        $scope.iconUrl = ko.pureComputed(function() {
            var type = $scope.iconType();
            var icon = self.icon();

            if (type == "image") {
                return icon.substring(4);
            } if (type == "font") {
                return icon.substring(5);
            } else {
                return icon;
            }
        }, $scope);

        $scope.url = ko.pureComputed(function() {
            var pageName = self.pageName();
            var pageParams = self.pageParams();

            if (pageName) {
                return '#' + $$.routing.hash(pageName, pageParams);
            }
        });

        this.dispose = function() {
            // Inform the main layout that a navbar is no longer available
            hasNavbar(false);
        }
    }

    return $$.component(LayoutNavbarComponent, template);
});
