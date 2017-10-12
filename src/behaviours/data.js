define([
    'quark',
    'knockout'
], function($$, ko) {

    /**
       @behaviour datasource Crea un metodo que funciona como origen de datos consultando un servicio REST a través de AJAX.
       Acepta la siguiente configuracion
     {
          fnName: Nombre de la funcion a crear (por defecto read)
          method: Metodo REST a invocar (por defecto GET)
          args: Objeto donde cada elemento es el nombre de un atributo que recibe la funcion
          auth: Boolean que indica si el servicio se debe invocar con token
          url: Url a invocar
            Si es un string invoca a $$.formatString pasandole un objeto con los parametros de la funcion
            Si es una funcion la ejecuta para obtener la URL
          payload: Datos a enviar al servicio
            Si es una funcion la ejecuta y envia el resultado
            Si no es una funcion envia el valor especificado
            Si no se especifica envia un objeto vacio
    }*/
    $$.behaviour.define('datasource', function(target, config) {
        var fnName = config.fnName || 'read';
        var method = config.method || 'GET';
        var args = config.args || {};
        var auth = config.auth || false;

        if (!$$.isString(config.url) && !$$.isFunction(config.url)) {
            throw new Error('Debe especificar la opcion url indicando un string o una funcion que devuelva la url a invocar');
        }

        var values = {};

        target[fnName] = function() {
            for (var i = 0; i < arguments.length; i++) {
                if (args[i]) {
                    values[args[i]] = arguments[i];
                }
            }

            var url;
            if ($$.isString(config.url)) {
                url = $$.formatString(config.url, values);
            } else {
                url = config.url(values);
            }

            var payload;
            if ($$.isFunction(config.payload)) {
                payload = config.payload(values);
            } else {
                if (config.payload) {
                    payload = config.payload;
                } else {
                    payload = {};
                }
            }

            var callback = arguments[arguments.length - 1];

            var options = {};

            if (config.description) {
                options.description = config.description;
            }

            $$.ajax(url, method, payload, {
                onSuccess: function(data) {
                    if ($$.isFunction(callback)) {
                        $$.call(callback, false, data);
                    }
                },
                onError: function(jqXHR, textStatus, errorThrown) {
                    if ($$.isFunction(callback)) {
                        return $$.call(callback, true, jqXHR, textStatus, errorThrown);
                    }
                }
            }, auth, options);
        };

    });

    /**
       @behaviour readIntoObservable Crea un metodo que funciona como origen de datos consultando un servicio REST a través de AJAX.
       Acepta la siguiente configuracion
     {
          fnName: Nombre de la funcion a crear (por defecto read)
          method: Metodo REST a invocar (por defecto GET)
          args: Objeto donde cada elemento es el nombre de un atributo que recibe la funcion
          auth: Boolean que indica si el servicio se debe invocar con token
          url: Url a invocar
            Si es un string invoca a $$.formatString pasandole un objeto con los parametros de la funcion
            Si es una funcion la ejecuta para obtener la URL
          payload: Datos a enviar al servicio
            Si es una funcion la ejecuta y envia el resultado
            Si no es una funcion envia el valor especificado
            Si no se especifica envia un objeto vacio
    }*/

    $$.behaviour.define('readIntoObservable', function(target, config) {
        var datasource = config.datasource;

        function callback(err, data) {
            if (ko.isObservable(config.block)) {
                config.block(false);
            }

            if (!err) {
                config.data(data);
                $$.call(config.success, data);
            } else {
                $$.call(config.error);
            }

            $$.call(config.complete);
        }

        target[config.fnName] = function() {
            Array.prototype.push.call(arguments, callback);

            if (ko.isObservable(config.block)) {
                config.block(true);
            }

            datasource.apply(null, arguments);
        }
    });
});
