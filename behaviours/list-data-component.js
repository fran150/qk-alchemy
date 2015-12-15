define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('list-data-component', function(object) {
        if (!object) {
            throw 'Must specify this behaviour configuration.';
        }

        // Get target object
        var target = object.target;
        var url = object.url;
        var params = object.params;
        var text = {
            list: 'Cargando Registros...'
        }
        var auth = object.auth;

        // Apply configuration
        $.extend(text, object.text);

        if (!target.blocker) {
            $$.parameters({
                blocker: ko.observable()
            }, params, target);
        }

        $$.parameters({
            $list: ko.observableArray()
        }, params, target);

        target.list = function(page, size, callback) {
            target.blocker(text.list);

            if ($$.isInt(page) && $$.isInt(size)) {
                url += '?page=' + page & '&size=' + size;
            }

            $$.ajax(url, 'GET', {}, {
                onSuccess: function(data) {
                    target.$list(data);
                    $$.call(callback, data);
                },
                onComplete: function() {
                    target.blocker('');
                }
            }, auth, { source: object.source });
        }

    });
});
