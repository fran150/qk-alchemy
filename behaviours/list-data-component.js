define(['knockout', 'quark', 'jquery'], function(ko, $$, $) {

    $$.behaviour('list-data-component', function(object) {
        if (!object) {
            throw 'Must specify this behaviour configuration.';
        }

        // Get target object
        var target = object.target;
        var paramUrl = object.url;
        var params = object.params;
        var text = {
            list: 'Cargando Registros...'
        }

        var auth = object.auth;

        var functionName = object.functionName || 'list';

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

        target[functionName] = function(args, callback, page, size) {
            target.blocker(text.list);

            if ($$.isInt(page) && $$.isInt(size)) {
                url += '?page=' + page & '&size=' + size;
            }

            if ($$.isFunction(paramUrl)) {
                url = paramUrl(args);
            }
            if ($$.isString(paramUrl)) {
                url = paramUrl;
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
