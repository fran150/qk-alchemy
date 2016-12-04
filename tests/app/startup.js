(function() {
    // Reference your test modules here
    var testModules = [
        'specs/layout'
    ];

    // After the 'jasmine-boot' module creates the Jasmine environment, load all test modules then run them
    require(['quark', 'jasmine-boot', 'qk-alchemy/main'], function ($$) {
        var modulesCorrectedPaths = testModules.map(function(m) { return m; });
        require(modulesCorrectedPaths, window.onload);

        $$.routing.activateHasher();
        $$.start();
    });
})();
