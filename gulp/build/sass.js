"use strict";

var config = require("../config.json");
var gulp = require("gulp");
var sass = require("gulp-sass");
var sourceMaps = require("gulp-sourcemaps");

module.exports = function (target) {
    return gulp.src(config.src + "**/*.scss")
        .pipe(sourceMaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(sourceMaps.write("."))
        .pipe(gulp.dest(target));
};