define(['knockout', 'quark'], function(ko, $$) {
    return function() {
        var self = this;

        // Item con el resultado
        this.$item = ko.observable();

        // Lee la clave especificada y transforma el valor en un objeto
        this.read = function(key) {
            var json = localStorage.getItem(key);
            var item = JSON.parse(json);
            self.$item(item);
        }

        // Convierte el item a json y lo guarda en la clave especificada
        this.save = function(key) {
            var json = JSON.stringify(self.$item());
            localStorage.setItem(key, json);
        }

        this.delete = function(key) {
            localStorage.removeItem(key);
        }
    }
});
