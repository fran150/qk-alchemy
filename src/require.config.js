define(['module', 'quark'], function(mod, $$) {
    debugger;
    $$.moduleRequireConfig(mod, {
        require: {
            shim: {
                "bootstrap-switch": { deps: ["jquery"] }
            }
        }
    });
});
