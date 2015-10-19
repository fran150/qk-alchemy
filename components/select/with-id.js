define(['knockout', 'quark', 'text!./with-id.html'], function(ko, $$, template) {
    return $$.component(function(params, $scope) {
        var self = this;

        var input;

        $$.parameters({
            options: ko.observableArray(),
            selected: ko.observable(),
            optionsCaption: ko.observable(),
            code: ko.observable()
        }, params, this);

        $$.config({
            valueField: 'value',
            textField: 'text',
            compare: function(code, objectValue) {
                return code == objectValue;
            }
        }, params, this);

        $scope.getInput = function(element) {
            input = element;

            $(input).bind('blur', function() {
                if (self.selected()) {
                    setCode(self.selected());
                }
            });
        }

        function validItem(item) {
            if ($$.isObject(item) && $$.isDefined(item[self.config.valueField])) {
                return true;
            }

            return false;
        }

        function setCode(item) {
            var code = self.code();

            if (validItem(item)) {
                if (item[self.config.valueField] != code) {
                    self.code(item[self.config.valueField]);
                }
            } else {
                self.code('');
            }
        }

        var subscriptions = {
            selected: self.selected.subscribe(function(item) {
                if (!$(input).is(":focus")) {
                    setCode(item);
                }
            }),
            code: self.code.subscribe(function(code) {
                var value;
                var item;
                var options = self.options();

                if (code) {
                    for (var index in options) {
                        item = options[index];
                        value = item[self.config.valueField];

                        if ($$.isDefined(value)) {
                            if (self.config.compare(code, value)) {
                                self.selected(item);
                                return;
                            }
                        }
                    }
                }
            })
        }

        this.dispose = function() {
            subscriptions.code.dispose();
            subscriptions.selected.dispose();
            $(input).unbind();
        }

    }, template);
});
