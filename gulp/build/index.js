"use strict";

var autoprefixer = require("gulp-autoprefixer");
var config = require("../config.json");
var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var minifyCss = require("gulp-minify-css");
var rev = require("gulp-rev");
var uglify = require("gulp-uglify");
var usemin = require("gulp-usemin");

module.exports = function () {
    var autoPrefixerOptions = {
        browsers: [
            "Android >= 4.4",
            "last 2 Chrome versions",
            "last 3 ChromeAndroid versions",
            "last 2 Edge versions",
            "last 2 Firefox versions",
            "last 3 FirefoxAndroid versions",
            "IE >= 11",
            "iOS >= 7",
            "last 2 Opera versions",
            "Safari >= 7"
        ].join(),
        cascade: false
    };
    return gulp.src(config.dist + "index.html")
        .pipe(usemin({
            css1: [autoprefixer(autoPrefixerOptions), minifyCss(), "concat", rev()],
            css2: [autoprefixer(autoPrefixerOptions), minifyCss(), "concat", rev()],
            html: [htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                processScripts: ["text/ng-template"]
            })],
            js1: [uglify({ compress: false, mangle: false }), rev()],
            js2: [uglify({ compress: false, mangle: false }), rev()],
            js3: [uglify({ compress: false, mangle: false }), rev()],
            js4: [uglify(), rev()]
        }))
        .pipe(gulp.dest(config.dist));
};