
define('text!qk-alchemy/components/layout/sidebar.component.html',[],function () { return '<quark-component>\n    <div class="sidebar" data-bind="onBind: init,\n                                    css: classes,\n                                    style: styles">\n        <button data-bind="onBind: initResizer,\n                          style: resizerStyle,\n                          css: resizerClass">\n           <span class="glyphicon glyphicon-option-vertical"></span>\n        </button>\n\n        <ul data-bind="style: { marginTop: model.marginTop }">\n            <!-- ko content -->\n            <!-- /ko -->\n        </ul>\n    </div>\n</quark-component>\n';});

define('qk-alchemy/lib/utils',['quark', 'knockout'], function($$, ko) {
    function Utils() {
        var self = this;

        this.findContainer = function(context, type) {
            // Get the context container
            var container = context.$container;

            var found = false;

            if ($$.isArray(type)) {
                for (var i = 0; i < type.length; i++) {
                    var actualType = type[i];

                    if (container instanceof actualType) {
                        found = true;
                        break;
                    }
                }
            } else {
                found = (container instanceof type);
            }

            // If the container exists and is of the requested type return it
            if (found) {
                return container;
            } else {
                // If there's a parent context search for the container type on it
                var parentContext = context.$parentContext;

                if (parentContext) {
                    return self.findContainer(parentContext, type);
                }
            }
        }
    }

    return new Utils();
});

define('text!qk-alchemy/components/layout.component.html',[],function () { return '<!-- quark-component -->\n    <!-- ko content -->\n    <!-- /ko -->\n<!-- /ko -->\n';});

define('qk-alchemy/components/layout.component',['quark', 'knockout', 'text!./layout.component.html'], function($$, ko, template) {
    function LayoutComponent(params, $scope, $imports) {
        var self = this;

        // The layout has a navbar
        this.hasNavbar = ko.observable(false);
        // The layout has a sidebar
        this.hasSidebar = ko.observable(false);

        // Component parameters
        $$.parameters({
            // Sidebar's width in pixels
            sidebarSize: ko.observable(90),
            // Main container responsive size
            containerSize: ko.observable('md'),
            // Min sidebar size in pixels
            minSidebarSize: ko.observable(20),
            // Container fluid?
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
                $(document).css('margin-top', '50px');
            } else {
                $(document).css('margin-top', 'auto');
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
;
define('qk-alchemy/components/layout/sidebar.component',['knockout', 'quark', 'text!./sidebar.component.html',
        'qk-alchemy/lib/utils',
        '../layout.component'],
       function(ko, $$, template, utils, LayoutComponent) {

    function LayoutSidebarComponent(params, $scope, $imports) {
        var self = this;

        // Indicates if the layout has a navbar
        var hasNavbar = ko.observable();
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
                containerSize = layoutMain.containerSize;

                // Apply local parameter value to layout variables
                $$.inject(params, layout);

                // Set the has sidebar variable to true on the main layout
                layoutMain.hasSidebar(true);

                // Publish properties of the layout as local properties of this model
                self.sidebarSize = layoutMain.sidebarSize;
                self.minSidebarSize = layoutMain.minSidebarSize;
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
            }),
            hasNavbar: hasNavbar.subscribe(function(newValue) {
                // When the hasNavbar observable changes, move the top value of the sidebar
                // to make room for it
                setSidebarTop(newValue);
            })
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
            subscriptions.resizing.dispose();
            subscriptions.hasNavbar.dispose();

            $(resizerElement).off('mousedown', startResizing);
            $(sidebarElement).off('mousemove', showResizerBar);
            $(sidebarElement).off('mouseleave', hideResizerBar);
            $(window).off('mousemove', resizeSidebar);
            $(window).off('mouseup', stopResizing);

        }
    }

    return $$.component(LayoutSidebarComponent, template);
});

define('text!qk-alchemy/components/layout/sidebar/imagebutton.component.html',[],function () { return '<quark-component>\n    <li class="text-center imagebutton" data-bind="onBind: init,\n                                                   click: click">\n        <a data-bind="click: click, attr: { href: url }">\n            <!-- ko if: model.icon -->\n                <div data-bind="css: model.icon"></div><br />\n            <!-- /ko -->\n            <small class="sidebar-text" data-bind="text: model.text,\n                                                   css: { notext: hideText }">\n            </small>\n        </a>\n    </li>\n</quark-component>\n';});

define('qk-alchemy/components/layout/sidebar/imagebutton.component',['knockout', 'quark', 'text!./imagebutton.component.html',
        'qk-alchemy/lib/utils',
        '../sidebar.component'],
        function(ko, $$, template, utils, Sidebar) {

    function LayoutSidebarImageButtonComponent(params, $scope) {
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
                throw new Error('This component must be used inside an al-layout-sidebar component');
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

    return $$.component(LayoutSidebarImageButtonComponent, template);
});

define('text!qk-alchemy/components/layout/sidebar/link.component.html',[],function () { return '<quark-component>\n    <li data-bind="onBind: init">\n        <ul>\n            <!-- ko hasContent: \'submenu\', virtual: true -->\n                <li class="option" style="position: relative" data-bind="click: model.toggle">\n                    <small style="position: absolute" class="glyphicon" data-bind="css: arrow">\n                    </small>\n\n                    <span class="line">\n                        <!-- ko if: model.iconFont -->\n                            <span data-bind="css: model.iconFont"></span>\n                        <!-- /ko -->\n\n                        <a href="#">\n                            <small data-bind="text: model.text"></small>\n                        </a>\n                    </span>\n                </li>\n                <!-- ko if: model.opened -->\n                    <li style="position: relative">\n                        <!-- ko content: \'submenu\', virtual: true -->\n                        <!-- /ko -->\n                    </li>\n                <!-- /ko -->\n            <!-- /ko -->\n\n            <!-- ko hasNotContent: \'submenu\', virtual: true -->\n                <li data-bind="click: click" class="option">\n                    <span class="line">\n                        <!-- ko if: model.iconFont -->\n                            <span data-bind="css: model.iconFont"></span>\n                        <!-- /ko -->\n                        <a href="#" data-bind="click: click, attr: { href: url }">\n                            <small data-bind="text: model.text"></small>\n                        </a>\n                    </span>\n                </li>\n            <!-- /ko -->\n        </ul>\n    </li>\n</quark-component>\n';});

define('qk-alchemy/components/layout/sidebar/link.component',['knockout', 'quark', 'text!./link.component.html',
        'qk-alchemy/lib/utils',
        '../sidebar.component'],
        function(ko, $$, template, utils, Sidebar) {

    function LayoutSidebarLinkComponent(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            // Font icon class to show
            iconFont: ko.observable('glyphicon glyphicon-star'),
            // Text of the menu
            text: ko.observable('Menu Option'),
            // Route name
            pageName: ko.observable(),
            // Route parameters
            pageParams: ko.observable(),
            // True if the menu is opened showing submenus
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

define('text!qk-alchemy/components/layout/sidebar/search.component.html',[],function () { return '<quark-component>\n    <li>\n        <form data-bind="submit: search">\n            <div class="input-group">\n                <input type="text" class="form-control" data-bind="value: model.value,\n                                                                   attr: { placeholder: model.placeholder }">\n                <span class="input-group-btn">\n                    <button class="btn btn-default searchbutton" type="submit" data-bind="css: btnClass">\n                        &nbsp;<span class="glyphicon glyphicon-search"></span>\n                    </button>\n                </span>\n            </div>\n        </form>\n    </li>\n</quark-component>\n';});

define('qk-alchemy/components/layout/sidebar/search.component',['knockout', 'quark', 'text!./search.component.html',
        'qk-alchemy/lib/utils',
        '../sidebar.component'],
        function(ko, $$, template, utils, Sidebar) {

    function LayoutSidebarSearchComponent(params, $scope) {
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
                throw new Error('This component must be used inside an al-layout-sidebar component');
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

    return $$.component(LayoutSidebarSearchComponent, template);
});

define('text!qk-alchemy/components/layout/sidebar/title.component.html',[],function () { return '<quark-component>\n    <li data-bind="onBind: init">\n        <h5 class="line text-primary" data-bind="text: model.text"></h5>\n    </li>\n</quark-component>\n';});

define('qk-alchemy/components/layout/sidebar/title.component',['knockout', 'quark', 'text!./title.component.html',
        'qk-alchemy/lib/utils',
        '../sidebar.component'],
       function(ko, $$, template, utils, Sidebar) {

    function LayoutSidebarTitleComponent(params, $scope) {
        var self = this;

        // Component's parameters
        $$.parameters({
            // Font icon class to show
            iconFont: ko.observable('glyphicon glyphicon-star'),
            // Text of the title
            text: ko.observable('Menu Title')
        }, params, this);

        // On components init
        $scope.init = function(element, viewModel, context) {
            // Gets the model of the container component
            var container = utils.findContainer(context, Sidebar.modelType);

            // Check if its a Sidebar component
            if (!container) {
                throw new Error('This component must be used inside an al-sidebar component');
            }
        }
    }

    return $$.component(LayoutSidebarTitleComponent, template);
});
