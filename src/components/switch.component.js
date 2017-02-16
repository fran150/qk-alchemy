define([
    'quark',
    'knockout',
    'text!./switch.component.html',
    'loadCss!bt-switch/css/bootstrap3/bootstrap-switch.min',
    'bt-switch/js/bootstrap-switch.min'
], function($$, ko, template) {

    function SwitchComponent(params, $scope, $imports) {
        var self = this;

        // Set component parameters
        $$.parameters({
            value: ko.observable(false),
            size: ko.observable('mini'),
            onColor: ko.observable(),
            onText: ko.observable('Si'),
            offColor: ko.observable(),
            offText: ko.observable('No'),
            disabled: ko.observable(false)
        }, params, this);

        // Get element
        $scope.getElement = function(element) {
            //Define las opciones para el switch
            var options = {
                state: self.value(),
                disabled: self.disabled(),
                size: self.size(),
                onText: self.onText(),
                offText: self.offText(),
                onColor: self.onColor(),
                offColor: self.offColor(),
                onSwitchChange: function(event, state) {
                    self.value(state);
                }
            };

            $(element).bootstrapSwitch(options);
        }
    }

    return $$.component(SwitchComponent, template);
});
