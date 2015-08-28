define(['knockout', 'text!./pillbox-page.html'], function(ko, templateMarkup) {

    function Pillbox(params) {
    }

    Pillbox.prototype.dispose = function() { };

    return { viewModel: Pillbox, template: templateMarkup };

});
