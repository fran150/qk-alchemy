define(['knockout', 'quark', 'text!./datepicker.html', 'jqueryui/datepicker', 'jqueryui/i18n/datepicker-es'], function (ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        var element;

        $$.parameters({
            text: ko.observable(),
            value: ko.observable(),
            maxDate: ko.observable()
        }, params, this);

        $scope.getElement = function(htmlElement) {
            element = htmlElement;
            $(element).datepicker();

            var value = self.value();
            if (value) {
                $(element).datepicker("setDate", value);
                self.text($(element).val());
            }
        }

        this.subscriptions = {
            text: self.text.subscribe(function(newValue) {
                self.value($(element).datepicker("getDate"));
            }),
            value: self.value.subscribe(function(newValue) {
                $(element).datepicker("setDate", newValue);
            }),
            maxDate: self.maxDate.subscribe(function(newValue) {
                $(element).datepicker("option", "maxDate", newValue);
            })
        }

    }, template);
});
