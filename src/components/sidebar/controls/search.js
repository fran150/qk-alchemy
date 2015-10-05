define(['knockout', 'quark', 'text!./search.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            text: ko.observable(''),
            searched: ko.observable(),
            onSearch: undefined
        }, params, [this, $scope]);

        $scope.search = function() {
            if ($$.isFunction(self.onSearch)) {
                self.onSearch(self.text());
            }

            self.searched(self.text());
        };
    }, template);
});
