define(['knockout', 'quark', 'text!./sidebar.html'], function(ko, $$, templateMarkup) {

    function SideBar(params) {
        var self = this;

        $$.parameters({
            paddedFromTop: 50,
            containerType: 'sm'
        }, params, this);

        this.resizeHandler = {};
        this.readyHandler = {};

        var bootstrapWidths = {
            xs: 0,
            sm: 768,
            md: 992,
            lg: 1200
        };

        this.init = function(element) {
            function resize() {
                var minWidth = 0;
                if ($$.isDefined(bootstrapWidths[self.containerType])) {
                    minWidth = bootstrapWidths[self.containerType];
                };

                if ($(window).width() >= minWidth) {
                    $(element).css('height', $(window).height() - self.paddedFromTop);
                } else {
                    $(element).css('height', 'auto');
                }
            };

            self.readyHandler = $(document).ready(resize);
            self.resizeHandler = $(window).bind('resize', resize);
        };
    }

    SideBar.prototype.dispose = function() {
        $(window).unbind(this.resizeHandler);
        $(document).unbind(this.readyHandler);
    };
});
