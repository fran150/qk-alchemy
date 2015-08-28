define(['knockout', 'text!./spinbox-page.html'], function(ko, templateMarkup) {

    function Spinbox(params) {
    }

    Spinbox.prototype.dispose = function() { };

    return { viewModel: Spinbox, template: templateMarkup };

});
