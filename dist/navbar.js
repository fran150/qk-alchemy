define("text!qk-alchemy/components/layout/navbar.component.html",[],function(){return'<quark-component>\r\n    <div class="navbar navbar-default navbar-fixed-top" role="navigation" data-bind="onBind: init">\r\n        <div class="container-fluid">\r\n            <div class="navbar-header">\r\n                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\r\n                    <span class="sr-only">Desplegar menu</span>\r\n                    <span class="icon-bar"></span>\r\n                    <span class="icon-bar"></span>\r\n                    <span class="icon-bar"></span>\r\n                </button>\r\n                    <a data-bind="attr: { href: url }" class="navbar-brand">\r\n                        <!-- ko if: visibleIcon -->\r\n                            <!-- ko ifnot: iconType() == \'font\' -->\r\n                                <img data-bind="attr: { src: iconUrl }" />\r\n                            <!-- /ko -->\r\n                            <!-- ko if: iconType() == \'font\' -->\r\n                                <span class="font-icon" data-bind="css: iconUrl"></span>\r\n                            <!-- /ko -->\r\n                        <!-- /ko -->\r\n                        <span data-bind="text: model.brand"></span>\r\n                    </a>\r\n            </div>\r\n            <div class="collapse navbar-collapse">\r\n                <ul class="nav navbar-nav navbar-left">\r\n                    <!-- ko content: \'left\', virtual: true --><!-- /ko -->\r\n                </ul>\r\n\r\n                <ul class="nav navbar-nav navbar-right" style="padding-right: 15px;">\r\n                    <!-- ko content: \'right\', virtual: true --><!-- /ko -->\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</quark-component>\r\n'}),define("qk-alchemy/lib/utils",["quark","knockout"],function(n,o){function e(){var o=this;this.findContainer=function(e,t){var a=e.$container,r=!1;if(n.isArray(t))for(var i=0;i<t.length;i++){var s=t[i];if(a instanceof s){r=!0;break}}else r=a instanceof t;if(r)return a;var c=e.$parentContext;return c?o.findContainer(c,t):void 0}}return new e}),define("text!qk-alchemy/components/layout.component.html",[],function(){return"<!-- quark-component -->\r\n    <!-- ko content -->\r\n    <!-- /ko -->\r\n<!-- /ko -->\r\n"}),define("qk-alchemy/components/layout.component",["quark","knockout","text!./layout.component.html"],function(n,o,e){function t(e,t,a){function r(){var o=s.sidebarSize(),e=s.minSidebarSize(),t=$(window).width()/2;n.isNumeric(e)&&e>0&&o<e&&s.sidebarSize(e),o<0&&s.sidebarSize(0),o>t&&s.sidebarSize(t)}function i(n){n?$(document).css("margin-top","50px"):$(document).css("margin-top","auto")}var s=this;this.hasNavbar=o.observable(!1),this.hasSidebar=o.observable(!1),this.hasSubmenu=o.observable(!1),n.parameters({sidebarSize:o.observable(90),containerSize:o.observable("md"),minSidebarSize:o.observable(20),containerFluid:o.observable(!0)},e,this),a.initComponent=function(){r(s.sidebarSize()),i(s.hasNavbar())};var c={sidebarSize:s.sidebarSize.subscribe(r),minSidebarSize:s.minSidebarSize.subscribe(r),hasNavbar:s.hasNavbar.subscribe(i)};t.dispose=function(){c.sidebarSize.dispose(),c.minSidebarSize.dispose(),c.hasNavbar.dispose()}}return n.component(t,e)}),define("qk-alchemy/components/layout/navbar.component",["knockout","quark","text!./navbar.component.html","../../lib/utils","../layout.component"],function(n,o,e,t,a){function r(e,r){var i,s=this;o.parameters({pageName:n.observable(),pageParams:n.observable(),brand:n.observable("Brand Name"),icon:n.observable()},e,this),r.init=function(n,o,e){var r=t.findContainer(e,a.modelType);if(!r)throw new Error("The navbar component must be used inside an al-layout component");(i=r.hasNavbar)(!0)},r.visibleIcon=n.pureComputed(function(){return o.isString(s.icon())},r),r.iconType=n.pureComputed(function(){var n=s.icon();if(o.isString(n)){if("url:"==n.substring(0,4))return"image";if("font:"==n.substring(0,5))return"font"}return"unknown"},r),r.iconUrl=n.pureComputed(function(){var n=r.iconType(),o=s.icon();return"image"==n?o.substring(4):"font"==n?o.substring(5):o},r),r.url=n.pureComputed(function(){var n=s.pageName(),e=s.pageParams();if(n)return"#"+o.routing.hash(n,e)}),this.dispose=function(){i(!1)}}return o.component(r,e)}),define("text!qk-alchemy/components/layout/navbar/button.component.html",[],function(){return'<!-- quark-component -->\r\n    <li data-bind="onBind: init,\r\n                   css: { active: model.active }">\r\n        <a href="#" data-bind="click: click">\r\n            <!-- ko if: model.iconFont -->\r\n                <span data-bind="css: model.iconFont"></span>&nbsp;\r\n            <!-- /ko -->\r\n            <!-- ko if: model.text -->\r\n                <span data-bind="text: model.text"></span>\r\n            <!-- /ko -->\r\n        </a>\r\n    </li>\r\n<!-- /quark-component -->\r\n'}),define("qk-alchemy/components/layout/navbar/button.component",["knockout","quark","text!./button.component.html","../../../lib/utils","../navbar.component"],function(n,o,e,t,a){function r(e,r){var i=this;o.parameters({text:n.observable("Navbar Button"),iconFont:n.observable("glyphicon glyphicon-star"),active:n.observable(!1),onClick:function(){}},e,this),r.init=function(n,o,e){var r=t.findContainer(e,a.modelType);if(!r)throw new Error("This component must be used inside an al-layout-navbar component")},r.click=function(){o.call(i.onClick)}}return o.component(r,e)}),define("text!qk-alchemy/components/layout/navbar/dropdown.component.html",[],function(){return'<!-- quark-component -->\r\n    <li class="dropdown" data-bind="onBind: init, css: { active: model.active }">\r\n        <a href="#" class="dropdown-toggle" data-toggle="dropdown">\r\n            <!-- ko if: model.iconFont -->\r\n                <span data-bind="css: model.iconFont"></span>&nbsp;\r\n            <!-- /ko -->\r\n            <span data-bind="text: model.text"></span>\r\n            <span class="caret"></span>\r\n        </a>\r\n        <ul class="dropdown-menu">\r\n            <!-- ko content: \'*\' -->\r\n            <!-- /ko -->\r\n        </ul>\r\n    </li>\r\n<!-- /quark-component -->\r\n'}),define("qk-alchemy/components/layout/navbar/dropdown.component",["knockout","quark","text!./dropdown.component.html","../../../lib/utils","../navbar.component"],function(n,o,e,t,a){function r(e,r){o.parameters({iconFont:n.observable("glyphicon glyphicon-star"),text:n.observable("Dropdown"),active:n.observable(!1)},e,this),r.init=function(n,o,e){var r=t.findContainer(e,a.modelType);if(!r)throw new Error("This component must be used inside an al-layout-navbar component")}}return o.component(r,e)}),define("text!qk-alchemy/components/layout/navbar/dropdown/divider.component.html",[],function(){return'<!-- quark-component -->\r\n    <li data-bind="onBind: init" class="divider">\r\n    </li>\r\n<!-- /quark-component -->\r\n'}),define("qk-alchemy/components/layout/navbar/dropdown/divider.component",["knockout","quark","text!./divider.component.html","../../../../lib/utils","../dropdown.component"],function(n,o,e,t,a){function r(n,o){o.init=function(n,o,e){var r=t.findContainer(e,a.modelType);if(!r)throw new Error("This component must be used inside an al-layout-navbar-dropdown component")}}return o.component(r,e)}),define("text!qk-alchemy/components/layout/navbar/dropdown/header.component.html",[],function(){return'<!-- quark-component -->\r\n    <li data-bind="onBind: init, text: model.text" class="dropdown-header">\r\n    </li>\r\n<!-- /quark-component -->\r\n'}),define("qk-alchemy/components/layout/navbar/dropdown/header.component",["knockout","quark","text!./header.component.html","../../../../lib/utils","../dropdown.component"],function(n,o,e,t,a){function r(e,r){o.parameters({text:n.observable("Header")},e,this),r.init=function(n,o,e){var r=t.findContainer(e,a.modelType);if(!r)throw new Error("This component must be used inside an al-layout-navbar-dropdown component")}}return o.component(r,e)}),define("text!qk-alchemy/components/layout/navbar/dropdown/link.component.html",[],function(){return'<!-- quark-component -->\r\n    <li data-bind="onBind: init, css: { active: isActive, disabled: model.disabled }">\r\n        <a data-bind="attr: { href: url }">\r\n            <!-- ko if: model.iconFont -->\r\n                <span data-bind="css: model.iconFont"></span>&nbsp;\r\n            <!-- /ko -->\r\n\r\n            <span data-bind="text: model.text"></span>\r\n        </a>\r\n    </li>\r\n<!-- /quark-component -->\r\n'}),define("qk-alchemy/components/layout/navbar/dropdown/link.component",["knockout","quark","text!./link.component.html","../../../../lib/utils","../dropdown.component"],function(n,o,e,t,a){function r(e,r){function i(){var n=o.routing.current();return n==s.pageName()&&(c(!0),!0)}var s=this;o.parameters({pageName:n.observable(),pageParams:n.observable(),iconFont:n.observable("glyphicon glyphicon-star"),text:n.observable("Navbar Link"),disabled:n.observable(!1)},e,this);var c=n.observable();r.init=function(n,o,e){var r=t.findContainer(e,a.modelType);if(!r)throw new Error("This component must be used inside an al-layout-navbar-dropdown component");c=r.active,i()},r.url=n.pureComputed(function(){var n=s.pageName(),e=s.pageParams();if(n)return"#"+o.routing.hash(n,e)},r),r.isActive=n.computed(function(){return i()},r),r.dispose=function(){r.isActive.dispose()}}return o.component(r,e)}),define("text!qk-alchemy/components/layout/navbar/link.component.html",[],function(){return'<!-- quark-component -->\r\n    <li data-bind="onBind: init, css: { active: isActive }">\r\n        <a data-bind="attr: { href: url }">\r\n            <!-- ko if: model.iconFont -->\r\n                <span data-bind="css: model.iconFont"></span>&nbsp;\r\n            <!-- /ko -->\r\n\r\n            <span data-bind="text: model.text"></span>\r\n        </a>\r\n    </li>\r\n<!-- /quark-component -->\r\n'}),define("qk-alchemy/components/layout/navbar/link.component",["knockout","quark","text!./link.component.html","../../../lib/utils","../navbar.component"],function(n,o,e,t,a){function r(e,r){var i=this;o.parameters({pageName:n.observable(),pageParams:n.observable(),iconFont:n.observable("glyphicon glyphicon-star"),text:n.observable("Navbar Link")},e,this),r.init=function(n,o,e){var r=t.findContainer(e,a.modelType);if(!(r instanceof a.modelType))throw new Error("This component must be used inside an al-layout-navbar component")},r.url=n.pureComputed(function(){var n=i.pageName(),e=i.pageParams();if(n)return"#"+o.routing.hash(n,e)},r),r.isActive=n.pureComputed(function(){var n=o.routing.current();return n==i.pageName()},r)}return o.component(r,e)});
