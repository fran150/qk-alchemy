define(['knockout', 'quark', 'text!./button.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            onClick: function() {}
        }, params, this);

        $$.parameters({
            text: ko.observable(''),
            icon: ko.observable(''),
            visible: ko.observable(true)
        }, params, [this, $scope]);

        $scope.click = function() {
            $$.call(self.onClick);
        }

    }, template);
});
