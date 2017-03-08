define(['knockout', 'jquery'], function(ko, $) {

    function showOverlay(element, value) {
        if (value) {
            $(element).LoadingOverlay('show');
        } else {
            $(element).LoadingOverlay('hide', true);
        }
    }

    ko.bindingHandlers.overlay = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            $.LoadingOverlaySetup({
                color: "rgba(200, 200, 200, 0.8)",
                resizeInterval: 50,
                fade: false
            });

            var value = ko.unwrap(valueAccessor());
            showOverlay(element, value);
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            showOverlay(element, value);
        }
    };
});
