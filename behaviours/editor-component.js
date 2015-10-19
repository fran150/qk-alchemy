define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {
    $$.behaviour('editor-component', function(object) {
        // Get target object
        var target = object.target;

        // Get config
        var params = object.params || {};
        var properties = object.properties || [];

        // Create item property
        target.item = properties;

        // Apply item property as component parameter
        $$.parameters(target.item, params, target);

        // Create editable parameter
        $$.parameters({
            editable: ko.observable(true)
        }, params, target);

        // Create clear method
        target.clear = function() {
            $$.clear(target.item);
        }
    });
});
