define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {
    $$.behaviour('editor-component', function(object) {
        // Get target object
        var target = object.target;

        // Get params and default properties
        var params = object.params || {};
        var properties = object.properties || [];

        // Clone original properties into new object to keep them for default
        target.default = $$.cloneObservable(properties);

        // Create parameters for properties and publish them on item property
        $$.parameters(properties, params, target.item = {});

        // Create editable parameter
        $$.parameters({
            editable: ko.observable(true)
        }, params, target);

        // Create clear method
        target.clear = function() {
            var clean = $$.cloneObservable(target.default);
            $$.inject(clean, target.item);
        }
    });
});
