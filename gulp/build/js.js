"use strict";

var config = require("../config.json");
var gulp = require("gulp");

module.exports = function (target) {
    return gulp.src([config.src + "**/*.js", '!' + config.src + '**/*.spec.js']).pipe(gulp.dest(target));
};