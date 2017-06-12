/**
    @component
    Allows to define the general layout of the page. It coordinates the navbar,
    sidebar and main container and interactions between them.
    <br/>
    For example, this is a layout with a navbar and sidebar
    &lt;quark-component&lt;
        &lt;al-layout&lt;
            &lt;al-layout-sidebar&lt;
            &lt;/al-layout-sidebar&lt;

            &lt;al-layout-container&lt;
            &lt;/al-layout-container&lt;
        &lt;/al-layout&lt;
    &lt;/quark-component&lt;
    @allowContent
*/
define([
    'quark',
    'knockout',
    'text!./layout.component.html'
], function($$, ko, template) {

    function LayoutComponent(params, $scope, $imports) {
        var self = this;

        /**
            @property bool True if the layout contains a al-layout-navbar component.
            Do not set this property by code.
            @observable
        */
        this.hasNavbar = ko.observable(false);
        /**
            @property bool True if the layout has a al-layout-sidebar component.
            Do not set this property by code.
            @observable
        */
        this.hasSidebar = ko.observable(false);
        /**
            @property bool True if the layout has a al-layout-submenu component.
            Do not set this property by code.
            @observable
        */
        this.hasSubmenu = ko.observable(false);

        $$.parameters({
            /**
                @parameter int sidebar's width in pixels, sidebar's max size is
                half the window
                @observable @exposed
            */
            sidebarSize: ko.observable(90),
            /**
                @parameter string Bootstrap size with the breaking point of the main container.
                When the viewport is less than this size the sidebar breaks above
                the main content.
                @observable @exposed
            */
            containerSize: ko.observable('md'),
            /**
                @parameter int Minimal width of the sidebar in pixels
                @observable @exposed
            */
            minSidebarSize: ko.observable(20),
            /**
                @parameter bool True if the container is fluid
                @observable @exposed
            */
            containerFluid: ko.observable(true)
        }, params, this);

        // On component init
        $imports.initComponent = function() {
            // Validate sidebar size and apply body margin
            validateSize(self.sidebarSize());
            setBodyMargin(self.hasNavbar());
        }

        // Limit sidebar size
        function validateSize() {
            var size = self.sidebarSize();
            var minSize = self.minSidebarSize();
            var maxSize = $(window).width() / 2;

            if ($$.isNumeric(minSize) && minSize > 0 && size < minSize) {
                self.sidebarSize(minSize);
            }

            if (size < 0) {
                self.sidebarSize(0);
            }

            if (size > maxSize) {
                self.sidebarSize(maxSize);
            }
        }

        // Applies the body margin if it has a navbar
        function setBodyMargin(hasNavbar) {
            if (hasNavbar) {
                $(document).css('padding-top', '50px');
            } else {
                $(document).css('padding-top', 'auto');
            }
        }

        var subscriptions = {
            // Validate sidebar size on size change
            sidebarSize: self.sidebarSize.subscribe(validateSize),
            // Validate sidebar size on min size change
            minSidebarSize: self.minSidebarSize.subscribe(validateSize),
            // Apply body margin when hasNavbar changes
            hasNavbar: self.hasNavbar.subscribe(setBodyMargin)
        };

        // Cleans component on dispose
        $scope.dispose = function() {
            subscriptions.sidebarSize.dispose();
            subscriptions.minSidebarSize.dispose();
            subscriptions.hasNavbar.dispose();
        }
    }

    return $$.component(LayoutComponent, template)
})
