define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('crud-data-component', function(object) {
        // Get target object
        var target = object.target;
        var url = object.url;
        var params = object.params;
        var text = {
            create: 'Guardando...',
            read: 'Cargando Registro...',
            update: 'Actualizando...',
            delete: 'Eliminando...'
        }

        // Apply configuration
        $.extend(text, object.text);

        if (!target.blocker) {
            $$.parameters({
                blocker: ko.observable()
            }, params, target);
        }

        $$.parameters({
            $item: ko.observable()
        }, params, target);

        target.create = function(callback) {
            target.blocker(text.create);
            $$.ajax(url, 'POST', target.$item(), {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    target.blocker('');
                }
            });
        }

        target.read = function(id, callback) {
            target.blocker(text.read);
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

        target.update = function(id, callback) {
            target.blocker(text.update);
            $$.ajax(url + '/' + id, 'PUT', target.$item(), {
                onSuccess: function(data) {
                    $$.call(callback, data);
                },
                onComplete: function() {
                    target.blocker('');
                }
            });
        }

        target.delete = function(id, callback) {
            target.blocker(text.delete);
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
