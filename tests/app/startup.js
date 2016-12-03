(function() {
    // Reference your test modules here
    var testModules = [
        'specs/layout'
    ];

    // After the 'jasmine-boot' module creates the Jasmine environment, load all test modules then run them
    require(['jasmine-boot', '../main'], function () {
        var modulesCorrectedPaths = testModules.map(function(m) { return m; });
        require(modulesCorrectedPaths, window.onload);
    });
})();
