define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('simple-data-read', function(object) {
        if (!object) {
            throw 'Must specify this behaviour configuration.';
        }

        // Get target object
        var target;
        if (object.target) {
            target = object.target;
        } else {
            throw new 'Must specify the object where to apply this behaviour on the \'target\' property.';
        }

        // Get the url object
        var url;
        if (object.url) {
            url = object.url;
        } else {
            throw new 'Must specify the service url.';
        }

        // Get parameters from config
        var params = object.params || {};

        var config = {
            blockText: 'Cargando...',
            itemProperty: '$item',
            methodName: 'read',
            auth: false
        }

        // Apply text configuration
        $.extend(config, object.config);

        // If there isn't a blocker defined in the configuration create one from the parameters
        if (!target.blocker) {
            $$.parameters({
                blocker: ko.observable()
            }, params, target);
        }

        var parameters = {};
        parameters[config.itemProperty] = ko.observable();

        // Create a parameter for the service data result
        $$.parameters(parameters, params, target);

        function createUrl(args) {
            var target = url;
            for (var i = 0; i < args.length; i++) {
                target += '/' + args[i];
            }
            return target;
        }

        // Create a read method wich reads the record with the specified id and loads it into the $item observable
        target[config.methodName] = function(callback) {
            // Block screen
            target.blocker(config.blockText);

            // Get the $item from the service and load it into the $item observable, when finish invoke the callback and unblock
            $$.ajax(createUrl(arguments), 'GET', {}, {
                onSuccess: function(data) {
                    target[config.itemProperty](data);
                    $$.call(callback, data);
                },
                onComplete: function() {
                   target.blocker('');
                }
            }, config.auth, { source: config.source });
        }
    });
});
