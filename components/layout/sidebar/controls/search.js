define(['knockout', 'quark', 'text!./search.html'], function(ko, $$, template) {
    function SidebarSearch(params, $scope) {
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

    return $$.component(SidebarSearch, template);
});
