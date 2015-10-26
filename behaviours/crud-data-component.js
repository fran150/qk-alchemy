define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('crud-data-component', function(object) {
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

        // Get blocking text configuration
        var text = {
            create: 'Guardando...',
            read: 'Cargando Registro...',
            update: 'Actualizando...',
            delete: 'Eliminando...'
        }

        // Apply text configuration
        $.extend(text, object.text);

        // If there isn't a blocker defined in the configuration create one from the parameters
        if (!target.blocker) {
            $$.parameters({
                blocker: ko.observable()
            }, params, target);
        }

        // Create a parameter for the service data result
        $$.parameters({
            $item: ko.observable()
        }, params, target);

        // Create a 'create' method wich adds the record to the service
        target.create = function(callback) {
            // Block screen
            target.blocker(text.create);

            // Post the $item to the service, when finish invoke the callback and unblock
            $$.ajax(url, 'POST', target.$item(), {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    target.blocker('');
                }
            });
        }

        // Create a read method wich reads the record with the specified id and loads it into the $item observable
        target.read = function(id, callback) {
            // Block screen
            target.blocker(text.read);

            // Get the $item from the service and load it into the $item observable, when finish invoke the callback and unblock
            $$.ajax(url + '/' + id, 'GET', {}, {
                onSuccess: function(data) {
                    target.$item(data);
                    $$.call(callback, data);
                },
                onComplete: function() {
                   target.blocker('');
                }
            });
        }

        // Create a update wich edits the record sending the $item to the specified id
        target.update = function(id, callback) {
            // Block screen
            target.blocker(text.update);

            // Put the $item into the service when finish invoke the callback and unblock
            $$.ajax(url + '/' + id, 'PUT', target.$item(), {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    target.blocker('');
                }
            });
        }

        // Create a delete method wich deletes the record with the specified id
        target.delete = function(id, callback) {
            // Block screen
            target.blocker(text.delete);

            // Delete the record with the specified id
            $$.ajax(url + '/' + id, 'DELETE', {}, {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    target.blocker('');
                }
            });
        }
    });
});
