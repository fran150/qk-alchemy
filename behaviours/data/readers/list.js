define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {
    $$.behaviour('data/readers/list', function(object) {
        // Validate that an input parameter is specified
        if (!$$.isObject(object)) {
            throw 'Must specify this behaviour configuration as an object.';
        }

        // Get target object, the object to wich the behaviour must be applied
        var target;
        if (object.target) {
            target = object.target;
        } else {
            throw 'Must specify the object where to apply this behaviour on the \'target\' property.';
        }

        // Get the url option
        var paramUrl;
        if (object.url) {
            paramUrl = object.url;
        } else {
            throw 'Must specify the service url.';
        }

        // Initialize config
        var config = {
            blockText: 'Cargando...',
            methodName: 'list',
            auth: false,
            source: ''
        }

        function getUrl(args, param) {
            // If the URL is a function call the function with the arguments and obtain the url
            if ($$.isFunction(param)) {
                return param(args);
            }

            // If the URL is a string use it as is
            if ($$.isString(param)) {
                return $$.formatStringObj(param, args);
            }
        }

        // Combine specified configuration with the default
        $.extend(config, object.config);

        // Create a read method wich reads the record with the specified id and loads it into the $item observable
        target[config.methodName] = function(args, callback) {
            // If a blocker is configured block the screen
            if (config.blocker) {
                config.blocker(config.blockText);
            }

            // URL to invoke
            var url = getUrl(args, paramUrl);

            $$.ajax(url, 'GET', {}, {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    if (config.blocker) {
                        config.blocker('');
                    }
                }
            }, config.auth, { source: config.source });
        }
    });
});
