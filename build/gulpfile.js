// Node modules
var fs = require('fs'),
    vm = require('vm'),
    merge = require('deeply'),
    chalk = require('chalk'),
    es = require('event-stream'),
    del = require('del');

// Gulp and plugins
var gulp = require('gulp'),
    rjs = require('gulp-requirejs-bundler'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace');



var moduleName = 'qk-alchemy';


// Config
var requireJsRuntimeConfig = vm.runInNewContext(
    fs.readFileSync('bower_components/quark/dist/require.configurator.js') + ';' +
    fs.readFileSync('bower_components/quark/dist/quark.require.conf.js') + ';' +
    'require = requireConfigure(QuarkRequireConf());');

    var config = {
        out: '../dist/main.js',
        baseUrl: '../src',
        name: 'main',
        paths: {
            'quark': 'empty:',
            'knockout': 'empty:',
            'jquery': 'empty:',
            text: '../build/bower_components/requirejs-text/text',
            requireLib: '../build/bower_components/requirejs/require'
        },
        include: [
            'components/pager.component',
            'components/panel/collapsable.component',
        ],
        exclude: [
            'text'
        ],
        insertRequire: ['main'],
        bundles: {
            'layout': [
                'components/layout.component',
                'components/layout/container.component',
            ],
            'sidebar': [
                'components/layout/sidebar.component',
                'components/layout/sidebar/imagebutton.component',
                'components/layout/sidebar/link.component',
                'components/layout/sidebar/search.component',
                'components/layout/sidebar/title.component'
            ],
            'navbar': [
                'components/layout/navbar.component',
                'components/layout/navbar/button.component',
                'components/layout/navbar/dropdown.component',
                'components/layout/navbar/dropdown/divider.component',
                'components/layout/navbar/dropdown/header.component',
                'components/layout/navbar/dropdown/link.component',
                'components/layout/navbar/link.component'
            ]
        }
    }

    config.name = moduleName + '/' + config.name;
    config.paths[moduleName] = '.';

    for (var i = 0; i < config.include.length; i++) {
        config.include[i] = moduleName + '/' + config.include[i];
    }

    for (var i = 0; i < config.insertRequire.length; i++) {
        config.insertRequire[i] = moduleName + '/' + config.insertRequire[i];
    }

    for (var name in config.bundles) {
        var newName = moduleName + '/' + name;

        config.bundles[newName] = config.bundles[name];
        delete config.bundles[name];

        for (var i = 0; i < config.bundles[newName].length; i++) {
            config.bundles[newName][i] = moduleName + '/' + config.bundles[newName][i];
        }
    }


    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, config);

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('../dist/'));
});

gulp.task('move-bundles', ['js'], function() {
    return gulp.src('../dist/' + moduleName + '/*.js')
                .pipe(clean({ force: true }))
                .pipe(gulp.dest('../dist'));
})

gulp.task('del-bundles-dir', ['js', 'move-bundles'], function() {
    del.sync(['../dist/' + moduleName], { force: true });
})

gulp.task('move-css', function() {
    return gulp.src('../src/css/*.css')
                .pipe(gulp.dest('../dist/css'));
})

gulp.task('move-bower-components', function() {
    return gulp.src('../src/bower_components/**')
                .pipe(gulp.dest('../dist/bower_components'));
})

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('../dist/**/*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('default', ['js', 'move-bundles', 'del-bundles-dir', 'move-css', 'move-bower-components'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
