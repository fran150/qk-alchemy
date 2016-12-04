// Node modules
var fs = require('fs'),
    vm = require('vm'),
    merge = require('deeply'),
    chalk = require('chalk'),
    es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'),
    rjs = require('gulp-requirejs-bundler'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(
    fs.readFileSync('../tests/bower_components/quark/dist/require.configurator.js') + ';' +
    fs.readFileSync('../tests/bower_components/quark/dist/quark.require.conf.js') + ';' +
    fs.readFileSync('../tests/app/require.config.js') + ';' +
    'require;');

    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: '../dist/main.js',
        baseUrl: '../src',
        name: 'qk-alchemy/main',
        paths: {
            'qk-alchemy': '.',
            'quark': 'empty:',
            'knockout': 'empty:',
            'jquery': 'empty:',
            text: '../tests/bower_components/requirejs-text/text',
            requireLib: '../tests/bower_components/requirejs/require'
        },
        include: [
            'qk-alchemy/components/layout.component',
            'qk-alchemy/components/pager.component'
        ],
        exclude: [
            'text'
        ],
        insertRequire: ['qk-alchemy/main'],
        bundles: {
            'qk-alchemy/layout': [
                'qk-alchemy/components/layout/container.component',
                'qk-alchemy/components/layout/navbar.component',
                'qk-alchemy/components/layout/sidebar.component',
                'qk-alchemy/components/layout/navbar/link.component',
                'qk-alchemy/components/layout/sidebar/link.component'
            ]
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        //.pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('../dist/'));
});

/*
// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', function () {
    var bowerCss = gulp.src('src/css/navbar.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src('src/css/*.css'),
        combinedCss = es.concat(bowerCss, appCss).pipe(concat('css.css')),
        fontFiles = gulp.src('./src/bower_modules/components-bootstrap/fonts/*', { base: './src/bower_modules/components-bootstrap/' });
    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('./dist/'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/'));
});
*/

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('../dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', ['js'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
