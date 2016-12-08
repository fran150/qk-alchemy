define("qk-alchemy/main",["module","knockout","jquery","quark","bootstrap-switch/js/bootstrap-switch.min"],function(n,o,e,t){return t.module(n,{prefix:"al",version:"1.0.0",components:{pager:"components/pager.component","panel-collapsable":"components/panel/collapsable.component"},namespaces:{layout:{"":"components/layout.component",container:"components/layout/container.component",sidebar:{"":"components/layout/sidebar.component",imagebutton:"components/layout/sidebar/imagebutton.component",link:"components/layout/sidebar/link.component",search:"components/layout/sidebar/search.component",title:"components/layout/sidebar/title.component"},navbar:{"":"components/layout/navbar.component",button:"components/layout/navbar/button.component",link:"components/layout/navbar/link.component",dropdown:{"":"components/layout/navbar/dropdown.component",link:"components/layout/navbar/dropdown/link.component",divider:"components/layout/navbar/dropdown/divider.component",header:"components/layout/navbar/dropdown/header.component"}}}},css:["css/sidebar.css","css/navbar.css"]})}),define("text!qk-alchemy/components/pager.component.html",[],function(){return'<quark-component>\n    <!-- ko content --><!-- /ko -->\n\n    <!-- ko if: model.pages() > 0 -->\n    <nav>\n        <ul class="pagination">\n            <li data-bind="css: { disabled: model.page() == 0 }">\n                <a href="#" data-bind="click: previous">\n                    <span>&laquo;</span>\n                </a>\n            </li>\n            <!-- ko foreach: pageArray -->\n                <li data-bind="css: { active: $parent.model.page() == $data }">\n                    <a href="#" data-bind="text: $data + 1, click: $parent.setPage">\n                    </a>\n                </li>\n            <!-- /ko -->\n            <li data-bind="css: { disabled: model.page() == (model.pages() - 1) }">\n                <a href="#" data-bind="click: next">\n                    <span>&raquo;</span>\n                </a>\n            </li>\n        </ul>\n    </nav>\n    <!-- /ko -->\n</quark-component>\n'}),define("qk-alchemy/components/pager.component",["quark","knockout","text!./pager.component.html"],function(n,o,e){function t(e,t,a){var c=this,p=5;n.parameters({data:o.observableArray(),pageSize:o.observable(p),page:o.observable(0)},e,this),this.recordCount=o.pureComputed(function(){return n.isArray(c.data())?c.data().length:0}),this.pages=o.pureComputed(function(){var n=c.recordCount(),o=c.pageSize();return Math.floor(n/o)+(n%o!=0?1:0)}),this.pageData=o.pureComputed(function(){var n=c.page(),o=c.pageSize(),e=(c.recordCount(),n*o),t=e+o;return c.data().slice(e,t)}),t.pageArray=o.pureComputed(function(){for(var n=[],o=0;o<c.pages();o++)n.push(o);return n}),t.setPage=function(n){c.page(n)},t.next=function(){c.page(c.page()+1)},t.previous=function(){c.page(c.page()-1)};var l={pageSize:c.pageSize.subscribe(function(n){0==n&&c.pageSize(p)}),page:c.page.subscribe(function(n){0>n&&c.page(0);var o=c.pages()-1;n>o&&c.page(o)})};this.dispose=function(){l.pageSize.dispose(),l.page.dispose()}}return n.component(t,e)}),define("text!qk-alchemy/components/panel/collapsable.component.html",[],function(){return'<quark-component>\n    <div class="panel" data-bind="css: panelType">\n        <div class="panel-heading" data-bind="click: model.toggle">\n            <!-- ko hasContent: \'heading\' -->\n                <!-- ko content: \'heading\' -->\n                <!-- /ko -->\n            <!-- /ko -->\n            <!-- ko hasNotContent: \'heading\' -->\n                &nbsp;\n            <!-- /ko -->\n            <span class="pull-right">\n                <span data-bind="css: icon"></span>\n            </span>\n        </div>\n        <div class="panel-body" data-bind="visible: !model.collapsed()">\n            <!-- ko content: \'content\' -->\n            <!-- /ko -->\n        </div>\n        <!-- ko hasContent: \'footer\' -->\n            <div class="panel-footer">\n                <!-- ko content: \'footer\' -->\n                <!-- /ko -->\n            </div>\n        <!-- /ko -->\n    </div>\n</quark-component>\n'}),define("qk-alchemy/components/panel/collapsable.component",["knockout","quark","text!./collapsable.component.html"],function(n,o,e){function t(e,t,a){var c=this,p={"default":"panel-default",primary:"panel-primary",info:"panel-info",success:"panel-success",warning:"panel-warning",danger:"panel-danger",green:"panel-green",red:"panel-red"};o.parameters({type:n.observable(),collapsed:n.observable(!1),click:function(){}},e,this),t.panelType=n.pureComputed(function(){return o.isDefined(p[c.type()])?p[c.type()]:"panel panel-default"},c),this.open=function(){c.collapsed(!1)},this.close=function(){c.collapsed(!0)},this.toggle=function(){o.call(c.click),c.collapsed(!c.collapsed())},t.icon=n.pureComputed(function(){return c.collapsed()?"glyphicon glyphicon-chevron-up":"glyphicon glyphicon-chevron-down"},t)}return o.component(t,e)}),require(["qk-alchemy/main"]),require.config({bundles:{"qk-alchemy/layout":["text!qk-alchemy/components/layout.component.html","qk-alchemy/components/layout.component","text!qk-alchemy/components/layout/container.component.html","qk-alchemy/lib/utils","qk-alchemy/components/layout/container.component"],"qk-alchemy/sidebar":["text!qk-alchemy/components/layout/sidebar.component.html","qk-alchemy/lib/utils","text!qk-alchemy/components/layout.component.html","qk-alchemy/components/layout.component","qk-alchemy/components/layout/sidebar.component","text!qk-alchemy/components/layout/sidebar/imagebutton.component.html","qk-alchemy/components/layout/sidebar/imagebutton.component","text!qk-alchemy/components/layout/sidebar/link.component.html","qk-alchemy/components/layout/sidebar/link.component","text!qk-alchemy/components/layout/sidebar/search.component.html","qk-alchemy/components/layout/sidebar/search.component","text!qk-alchemy/components/layout/sidebar/title.component.html","qk-alchemy/components/layout/sidebar/title.component"],"qk-alchemy/navbar":["text!qk-alchemy/components/layout/navbar.component.html","qk-alchemy/lib/utils","text!qk-alchemy/components/layout.component.html","qk-alchemy/components/layout.component","qk-alchemy/components/layout/navbar.component","text!qk-alchemy/components/layout/navbar/button.component.html","qk-alchemy/components/layout/navbar/button.component","text!qk-alchemy/components/layout/navbar/dropdown.component.html","qk-alchemy/components/layout/navbar/dropdown.component","text!qk-alchemy/components/layout/navbar/dropdown/divider.component.html","qk-alchemy/components/layout/navbar/dropdown/divider.component","text!qk-alchemy/components/layout/navbar/dropdown/header.component.html","qk-alchemy/components/layout/navbar/dropdown/header.component","text!qk-alchemy/components/layout/navbar/dropdown/link.component.html","qk-alchemy/components/layout/navbar/dropdown/link.component","text!qk-alchemy/components/layout/navbar/link.component.html","qk-alchemy/components/layout/navbar/link.component"]}});
