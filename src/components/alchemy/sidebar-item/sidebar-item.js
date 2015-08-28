define(['knockout', 'quark', 'text!./sidebar-item.html'], function(ko, $$, templateMarkup) {

    function SideBarItem(params) {
        var self = this;

        $$.parameters({
            icon: ko.observable('glyphicon glyphicon-apple'),
            text: ko.observable('Menu Option'),
            url: ko.observable('#'),
            opened: ko.observable(false)
        }, params, this);

        this._arrow = ko.pureComputed(function() {
           return self.opened() ? "glyphicon-menu-down" : "glyphicon-menu-right";
        });

        this.toggle = function() {
            self.opened(!self.opened());
        };
    }

    SideBarItem.prototype.dispose = function() { };

  return { viewModel: SidebarItem, template: templateMarkup };

});
