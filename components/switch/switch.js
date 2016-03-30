define(['knockout', 'quark', 'text!./switch.html', 'bootstrap-switch'], function (ko, $$, template, testSwitchery) {
    return $$.component(function(params, $scope) {
        var self = this;

        // Set component parameters
        $$.parameters({
            value: ko.observable(false),
            size: ko.observable(),
            onColor: ko.observable(),
            onText: ko.observable(),
            offColor: ko.observable(),
            offText: ko.observable(),
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

            // Le aplico el estilo del bootstrap switch
            $(element).bootstrapSwitch(options);
        }

    }, template);
});
