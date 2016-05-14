define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('data/crud', function(object) {
        if (!object) {
            throw 'Must specify this behaviour configuration.';
        }

        var target;

        if (object.target) {
            target = object.target;
        } else {
            throw new 'Must specify the object where to apply this behaviour on the \'target\' property.';
        }

        var config = object.config;

        if (!config) {
            config = {};
        }

        // Auth required for methods
        var auth = {
            create: false,
            read: false,
            update: false,
            delete: false
        }

        if (config) {
            // If Auth is defined item by item
            if ($$.isObject(config.auth)) {
                // Apply text configuration
                $.extend(auth, config.auth);
            } else if (config.auth === true) {
                // If auth is only a boolean set all methods to that value
                auth.create = true;
                auth.read = true;
                auth.update = true;
                auth.delete = true;
            }
        }

        var urls = {
            create: '',
            read: '',
            update: '',
            delete: ''
        }

        if (object.urls) {
            $.extend(urls, object.urls);
        }

        var blockText = {
            create: 'Guardando...',
            read: 'Cargando Registro...',
            update: 'Actualizando...',
            delete: 'Eliminando...'
        }

        if (config.blockText) {
            $.extend(blockText, config.blockText);
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

        target.create = function(item, callback) {
            if (config.blocker) {
                config.blocker(blockText.create);
            }

            var url = getUrl(item, urls.create);

            var json = ko.toJSON(item);

            $$.ajax(url, 'POST', json, {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    if (config.blocker) {
                        config.blocker('');
                    }
                }
            }, auth.create, { source: object.source });
        }

        // Create a read method wich reads the record with the specified id and loads it into the $item observable
        target.read = function(args, callback) {
            // Block screen
            if (config.blocker) {
                config.blocker(blockText.read);
            }

            var url = getUrl(args, urls.read);

            // Get the $item from the service and load it into the $item observable, when finish invoke the callback and unblock
            $$.ajax(url, 'GET', {}, {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    if (config.blocker) {
                        config.blocker('');
                    }
                }
            }, auth.read, { source: object.source });
        }

        // Create a update wich edits the record sending the $item to the specified id
        target.update = function(args, item, callback) {
            if (config.blocker) {
                config.blocker(blockText.update);
            }

            var url = getUrl(args, urls.update);

            var json = ko.toJSON(item);

            $$.ajax(url, 'PUT', json, {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    if (config.blocker) {
                        config.blocker('');
                    }
                }
            }, auth.update, { source: object.source });
        }

        // Create a delete method wich deletes the record with the specified id
        target.delete = function(args, callback) {
            if (config.blocker) {
                config.blocker(blockText.delete);
            }

            var url = getUrl(args, urls.delete);

            // Delete the record with the specified id
            $$.ajax(url, 'DELETE', {}, {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    if (config.blocker) {
                        config.blocker('');
                    }
                }
            }, auth.delete, { source: object.source });
        }
    });
});
