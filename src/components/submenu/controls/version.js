define(['knockout', 'quark', 'text!./version.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            appName: ko.observable('Optimus'),
            version: ko.observable('1.0.0')
        }, params, this);

    }, template);
});
