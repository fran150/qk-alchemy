define(['knockout', 'quark', 'text!./datepicker.html', 'bootstrap-datepicker', 'bootstrap-datepicker-es'], function (ko, $$, templateMarkup) {

    function Datepicker(params) {
        var self = this;

        // ELement container for datepicker
        var container = null;
        // Datepicker base element
        var element = null;

        // Set config options
        $$.config({
            type: 'group',
            autoclose: true,
            calendarWeeks: false,
            clearBtn: true,
            datesDisabled: [],
            daysOfWeekDisabled: [],
            daysOfWeekHighlighted: [],
            defaultviewdate: 'today',
            disableTouchKeyboard: false,
            enableOnReadonly: true,
            endDate: '',
            format: 'dd/mm/yyyy',
            immediateUpdates: false,
            keyboardNavigation: true,
            maxViewMode: 2,
            minViewMode: 0,
            multidate: false,
            multidateSeparator: ', ',
            orientation: 'auto',
            showOnFocus: true,
            startDate: '',
            startView: 0,
            title: '',
            todayBtn: false,
            todayHighlight: true,
            toggleActive: false,
            weekStart: 0,
            zIndexOffset: 10
        }, params, this);

        // Gets datepicker container
        this.getContainer = function(elem) {
            container = elem;
        }

        // Updates date param reading from control
        function updateDate() {
            var date = $(element).datepicker('getDate');
            if ($$.isValidDate(date)) {
                self.date(date);
            } else {
                self.date(undefined);
            }
        }

        // Get the base element
        this.getElement = function(elem) {
            // Get Base Element
            element = elem;
        }

        // On datepicker load...
        this.load = function (elem) {
            // Set base options
            var options = {
                container: container,
                language: 'es'
            };

            // Configure jquery component
            options = $.extend(options, self.config);

            // If calendar type is inline must update values on changeDate, otherwise must update on hide (because
            // it updates on keystroke)
            $(element).datepicker(options).on(self.config.type == "inline" ? 'changeDate': 'hide', function(event) {
                updateDate();
            });

            if (self.value()) {
                $(element).datepicker('setDate', $$.makeDate(self.value(), true));
                updateDate();
            } else {
                $(element).datepicker('setDate', self.date());
                updateDate();
            }
        }

        // Gets element and loads code
        this.getAndLoad = function(elem) {
            self.getElement(elem);
            self.load(elem);
        }

        // Set component parameters
        $$.parameters({
            // Transforms any input on a valid date and updating the parameter
            date: ko.computedParameter(params['date'], {
                read: function(param) {
                    return $$.makeDate(param(), true);
                },
                write: function(param, newValue) {
                    newValue = $$.makeDate(newValue, true);
                    param(newValue);
                }
            }, this),
            // Text Input value
            value: ko.observable(),
            enabled: ko.observable(true)
        }, params, this);

        // Set subscriptions
        this.subscriptions = {
            // When date is changed reset the value on the control
            date: this.date.subscribe(function(newValue) {
                $(element).datepicker('setDate', newValue);
            }),
            // When value is changed reset the value on the control and on the date param
            value: this.value.subscribe(function(newValue) {
                $(element).datepicker('setDate', newValue);
                updateDate();
            })
        };

        // Shows the calendar
        this.show = function() {
            $(element).datepicker('show');
        }

        // Hides the calendar
        this.hide = function() {
            $(element).datepicker('hide');
        }

        // Updates the calendar with the given date
        this.update = function(date) {
            $(element).datepicker('update', date);
        }
    }

    // Esto corre cuando el componente se destruye. Pon aqui cualquier logica necesaria
    // para limpiar. Por ejemplo cancelar setTimeouts o llamar a dispose de cualquier
    Datepicker.prototype.dispose = function () {
        this.date.dispose();
        this.subscriptions.date.dispose();
        this.subscriptions.value.dispose();
    };

    return { viewModel: Datepicker, template: templateMarkup };
});
