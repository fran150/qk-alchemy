define(['knockout', 'quark', 'text!./close-module.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            click: function() {}
        }, params, this);

    }, template);
});
