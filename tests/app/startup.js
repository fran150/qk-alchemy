define(['quark', 'jasmine-boot', 'qk-alchemy/main'], function($$, jazmine, main) {
    // Reference your test modules here

    // After the 'jasmine-boot' module creates the Jasmine environment, load all test modules then run them
    var testModules = [
        'specs/layout.test'
    ];

    var modulesCorrectedPaths = testModules.map(function(m) { return m; });

    require(modulesCorrectedPaths, function() {
        window.onload();
    });

    $$.start();
});
