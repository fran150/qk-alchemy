define(['knockout', 'quark', 'text!./sidebar-search.html'], function(ko, $$, templateMarkup) {

    function SideBarSearch(params) {
        var self = this;

        $$.parameters({
            text: ko.observable(''),
            searched: ko.observable(),
            onSearch: undefined
        }, params, this);

        this.search = function() {
            if ($$.isFunction(self.onSearch)) {
                self.onSearch(self.text());
            }

            self.searched(self.text());
        };
    }

    SideBarSearch.prototype.dispose = function() { };

  return { viewModel: SidebarSearch, template: templateMarkup };

});
