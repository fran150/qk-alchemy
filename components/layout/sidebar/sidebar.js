define(['knockout', 'quark', 'text!./sidebar.html', '../layout'],
    function(ko, $$, template, LayoutComponent) {

    function Sidebar(params, $scope) {
        var self = this;

        // Indicates if the sidebar is resizing
        this.resizing = ko.observable(false);
        // Stores the sidebar size observable of the layout component
        this.sidebarSize = ko.observable();
        // Stores the min sidebar size observable of the layout component
        this.minSidebarSize = ko.observable();

        const SIDEBAR_WIDTH = 10;

        // Main div DOM element
        var sidebarElement;
        // Resizer DOM element
        var resizerElement;
        // Offset of click in the resizer button
        var offset;

        // Layout variable values
        var layout = {
            containerSize: ko.observable(),
            sidebarSize: ko.observable(),
            hasNavbar: ko.observable()
        }

        function setSidebarTop(hasNavbar) {
            if (hasNavbar) {
                $(sidebarElement).css('top', '50px');
            } else {
                $(sidebarElement).css('top', '0px');
            }
        }

        // If corresponds show the resizer bar
        function showResizerBar(event) {
            // If the mouse is on the edge of the div show the resizer bar
            if (event.pageX > (self.sidebarSize() - SIDEBAR_WIDTH)) {
                $(resizerElement).show();
            } else {
                $(resizerElement).hide();
            }
        }

        // Hide the resizer bar
        function hideResizerBar() {
            if (!self.resizing()) {
                $(resizerElement).hide();
            }
        }

        // Start resizing the sidebar
        function startResizing(event) {
            // On mouse down start resizing and set initial size
            offset = event.offsetX;
            self.resizing(true);
            self.sidebarSize(event.pageX + (SIDEBAR_WIDTH - offset));
        }

        // Stop resizing the sidebar
        function stopResizing(event) {
            self.resizing(false);
        }

        // Change the sidebar size
        function resizeSidebar(event) {
            if (self.resizing()) {
                self.sidebarSize(event.pageX + (SIDEBAR_WIDTH - offset));
            }
        }


        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the DOM element
            sidebarElement = element;

            // Get the main layout component
            var layoutMain = context.$container;

            // Copy main layout component observables to local variables
            if (layoutMain instanceof LayoutComponent.modelType) {
                layout.sidebarSize = layoutMain.sidebarSize;
                layout.containerSize = layoutMain.containerSize;
                layout.hasNavbar = layoutMain.hasNavbar;

                layoutMain.hasSidebar(true);

                self.sidebarSize = layout.sidebarSize;
                self.minSidebarSize = layoutMain.minSidebarSize;
            } else {
                self.componentErrors.throw('The sidebar component must be used inside an al-layout component');

            }

            // When mouse move in main div check if the resizer bar must be
            // shown
            $(sidebarElement).on('mousemove', showResizerBar);

            // When mouse is leaving the main div and we are not resizing
            // hide the resizer bar
            $(sidebarElement).on('mouseleave', hideResizerBar);

            // Sets the sidebar top checking if it has navbar or not
            setSidebarTop(layout.hasNavbar())
        }

        // When the
        $scope.initResizer = function(element) {
            resizerElement = element;
            // Attach mouse down event to resizer element
            $(resizerElement).on('mousedown', startResizing);
        }

        var subscriptions = {
            // Subscribe to the resizing flag
            resizing: self.resizing.subscribe(function(newValue) {
                // If its resizing attach events to the window, if not detach
                if (newValue) {
                    $(window).on('mousemove', resizeSidebar);
                    $(window).on('mouseup', stopResizing);
                } else {
                    $(window).off('mousemove', resizeSidebar);
                    $(window).off('mouseup', stopResizing);
                }
            })
        }

        // Sidebar's width
        this.width = ko.pureComputed(function() {
            return layout.sidebarSize() + "px";
        });

        // Sidebar's classes
        $scope.classes = ko.pureComputed(function() {
            return "sidebar-col-" + layout.containerSize();
        });

        // Classes to apply to the resizer element
        $scope.resizerClass = ko.pureComputed(function() {
            return "resizer resizer-" + layout.containerSize();
        });

        // Dispose the component
        $scope.dispose = function() {
            subscriptions.resizing.dispose();

            $(resizerElement).off('mousedown', startResizing);
            $(sidebarElement).off('mousemove', showResizerBar);
            $(sidebarElement).off('mouseleave', hideResizerBar);
            $(window).off('mousemove', resizeSidebar);
            $(window).off('mouseup', stopResizing);

        }
    }

    return $$.component(Sidebar, template);
});
