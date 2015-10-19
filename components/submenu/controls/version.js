define(['knockout', 'quark', 'text!./version.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        $$.parameters({
            appName: ko.observable('Optimus'),
            appVersion: ko.observable('1.0.0'),
            moduleName: ko.observable(''),
            moduleVersion: ko.observable('')
        }, params, this);

    }, template);
});
