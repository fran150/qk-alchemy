define(['knockout', 'quark', 'text!./search.html'], function(ko, $$, template) {
    // Campo de busqueda en el sidebar
    return $$.component(function(params, $scope) {
        var self = this;

        // Parametros del componente
        $$.parameters({
            // Texto ingresado en el campo de busqueda
            text: ko.observable(''),
            // Texto placeholder
            placeholder: ko.observable('Search...'),
            // Tipo de boton
            style: ko.observable('default'),
            // Se dispara al hacer click en el boton buscar
            onSearch: function(texto) {}
        }, params, this);

        // Al hacer clic en el boton buscar invoca al evento con el texto ingresado
        $scope.search = function() {
            $$.call(self.onSearch, self.text());
        };

        $scope.btnClass = ko.pureComputed(function() {
            var style = self.style();

            switch (style) {
                case 'danger':
                case 'warning':
                case 'success':
                case 'primary':
                    return "btn-" + style;
                    break;
                default:
                    return "btn-default";
            }
        }, $scope);
    }, template);
});
