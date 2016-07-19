define(['knockout', 'quark', 'text!./sidebar.html', '../layout'],
    function(ko, $$, template, LayoutComponent) {

    return $$.component(function(params, $scope) {
        var self = this;

        // Indicates if the sidebar is resizing
        this.resizing = ko.observable(false);

        // Layout variable values
        var layout = {
            containerSize: ko.observable(),
            sidebarSize: ko.observable()
        }

        // On first tag bind init component
        $scope.init = function(element, viewModel, context) {
            // Get the main layout component
            var layoutMain = context.$child;

            // Copy main layout component observables to local variables
            if (layoutMain instanceof LayoutComponent.modelType) {
                layout.sidebarSize = layoutMain.sidebarSize;
                layout.containerSize = layoutMain.containerSize;
            }
        }

        function resizeSidebar(event) {
            if (self.resizing()) {
                layout.sidebarSize(event.pageX);
            }
        }

        function stopResizing(event) {
            self.resizing(false);
        }

        // Init component resizer
        $scope.initResizer = function(element) {
            // Attach mouse down event to resizer element
            $(element).on('mousedown', function(event) {
                // On mouse down start resizing and set initial size
                self.resizing(true);
                layout.sidebarSize(event.pageX);
            });
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
        this.dispose = function() {
            subscriptions.resizing.dispose();
        }
    }, template);
});
