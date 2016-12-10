define(['knockout', 'quark', 'text!./sidebar.component.html',
        'qk-alchemy/lib/utils',
        '../layout.component'],
       function(ko, $$, template, utils, LayoutComponent) {

    function LayoutSidebarComponent(params, $scope, $imports) {
        var self = this;

        // Indicates if the layout has a navbar
        var hasNavbar;
        // Indicates if the layout has a sidebar
        var hasSidebar;

        // Container bootstrap's size (when breaks to the top of page)
        var containerSize = ko.observable();

        // Indicates if the sidebar is resizing
        this.resizing = ko.observable(false);

        // This component local parameters
        $$.parameters({
            resizerWidth: ko.observable(10),
            marginTop: ko.observable(0)
        }, params, this);

        // Main div DOM element
        var sidebarElement;
        // Resizer DOM element
        var resizerElement;
        // Offset of click in the resizer button
        var offset;

        // Layout variable values that can be overriden by local parameters
        var layout = {
            // Stores the sidebar size observable of the layout component
            sidebarSize: ko.observable(),
            // Min sidebar's size
            minSidebarSize: ko.observable()
        }

        // Set's the sidebar top if the layout has a navbar or not
        function setSidebarTop(hasNavbar) {
            if (hasNavbar) {
                $(sidebarElement).css('top', '50px');
            } else {
                $(sidebarElement).css('top', '0px');
            }
        }

        // Show the resizer bar if mouse is in the correct position
        function showResizerBar(event) {
            // If the mouse is on the edge of the div show the resizer bar
            if (event.pageX > (layout.sidebarSize() - self.resizerWidth())) {
                $(resizerElement).show();
            } else {
                $(resizerElement).hide();
            }
        }

        // Hide the resizer bar if not resizing
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
            layout.sidebarSize(event.pageX + (self.resizerWidth() - offset));
        }

        // Stop resizing the sidebar
        function stopResizing(event) {
            self.resizing(false);
        }

        // Change the sidebar size
        function resizeSidebar(event) {
            if (self.resizing()) {
                layout.sidebarSize(event.pageX + (self.resizerWidth() - offset));
            }
        }

        // Observable subscriptions
        var subscriptions = {
            // Subscribe to the resizing flag
            resizing: self.resizing.subscribe(function(newValue) {
                // If its resizing attach events to the window to do the actual resizing and listen
                // if it has to stop resizing, otherwise detach those events
                if (newValue) {
                    $(window).on('mousemove', resizeSidebar);
                    $(window).on('mouseup', stopResizing);
                } else {
                    $(window).off('mousemove', resizeSidebar);
                    $(window).off('mouseup', stopResizing);
                }
            })
        }


        // When binding the main div
        $scope.init = function(element, viewModel, context) {
            // Get the sidebar's DOM element
            sidebarElement = element;

            // Get the main layout component
            var layoutMain = utils.findContainer(context, LayoutComponent.modelType);;

            // If a layout component is found
            if (layoutMain) {
                // Extract layout variables
                layout.sidebarSize = layoutMain.sidebarSize;
                layout.minSidebarSize = layoutMain.minSidebarSize;
                hasNavbar = layoutMain.hasNavbar;
                hasSidebar = layoutMain.hasSidebar;
                containerSize = layoutMain.containerSize;

                // Apply local parameter value to layout variables
                $$.inject(params, layout);

                // Set the has sidebar variable to true on the main layout
                layoutMain.hasSidebar(true);

                // Publish properties of the layout as local properties of this model
                self.sidebarSize = layoutMain.sidebarSize;
                self.minSidebarSize = layoutMain.minSidebarSize;

                // Subscribe to has navbar change
                subscriptions.hasNavbar = hasNavbar.subscribe(function(newValue) {
                    // When the hasNavbar observable changes, move the top value of the sidebar
                    // to make room for it
                    setSidebarTop(newValue);
                });

            } else {
                throw new Error('The sidebar component must be used inside an al-layout component');

            }

            // When mouse move in main div check if the resizer bar must be
            // shown
            $(sidebarElement).on('mousemove', showResizerBar);

            // When mouse is leaving the main div and we are not resizing
            // hide the resizer bar
            $(sidebarElement).on('mouseleave', hideResizerBar);

            // Sets the sidebar top checking if it has navbar or not
            setSidebarTop(hasNavbar())
        }

        // When the resizer inits
        $scope.initResizer = function(element) {
            // Get the resizer DOM element
            resizerElement = element;
            // Attach mouse down event to resizer element for resizing start
            $(resizerElement).on('mousedown', startResizing);
        }

        // Sidebar's width
        this.width = ko.pureComputed(function() {
            return layout.sidebarSize() + "px";
        });

        $scope.styles = ko.pureComputed(function() {
            var style = {
                width: layout.sidebarSize() + "px"
            };

            return style;
        });

        // Sidebar's classes
        $scope.classes = ko.pureComputed(function() {
            return "sidebar-col-" + containerSize();
        });

        // Classes to apply to the resizer element
        $scope.resizerClass = ko.pureComputed(function() {
            return "resizer resizer-" + containerSize();
        });

        // Element styles to apply to the resizer button
        $scope.resizerStyle = ko.pureComputed(function() {
            var width = self.resizerWidth();
            var style = { fontSize: width };

            style.left = (self.sidebarSize() - width) + "px";

            return style;
        })

        // Dispose the component
        $scope.dispose = function() {
            // Alert the layout component that it has no more sidebar
            hasSidebar(false);

            // Dispose subscriptions
            subscriptions.resizing.dispose();
            subscriptions.hasNavbar.dispose();

            // Delete events
            $(resizerElement).off('mousedown', startResizing);
            $(sidebarElement).off('mousemove', showResizerBar);
            $(sidebarElement).off('mouseleave', hideResizerBar);
            $(window).off('mousemove', resizeSidebar);
            $(window).off('mouseup', stopResizing);

        }
    }

    return $$.component(LayoutSidebarComponent, template);
});
