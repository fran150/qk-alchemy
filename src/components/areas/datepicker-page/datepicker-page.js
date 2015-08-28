define(['knockout', 'text!./datepicker-page.html'], function(ko, templateMarkup) {

    function Datepicker(params) {
        var self = this;

        this.enabled = ko.observable(true);
        this.value = ko.observable();
        this.date = ko.observable('01/01/2015');
    }

    Datepicker.prototype.dispose = function() { };

    return { viewModel: Datepicker, template: templateMarkup };

});
