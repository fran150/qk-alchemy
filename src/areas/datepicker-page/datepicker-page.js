define(['knockout', 'text!./datepicker-page.html'], function(ko, templateMarkup) {

    function Datepicker(params) {
        var self = this;

        this.enabled = ko.observable(true);
        this.value = ko.observable('01/01/2015');
        this.date = ko.observable();
    }

    Datepicker.prototype.dispose = function() { };

    return { viewModel: Datepicker, template: templateMarkup };

});
