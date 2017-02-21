"use strict";

var config = require("../config.json");
var gulp = require("gulp");
var revReplace = require("gulp-rev-replace");

module.exports = function () {
    return gulp.src([
        config.dist + "**/*.css",
        config.dist + "**/*.html",
        config.dist + "**/*.js"
    ])
    .pipe(revReplace({ manifest: gulp.src(config.dist + "*-manifest.json") }))
    .pipe(gulp.dest(config.dist));
};