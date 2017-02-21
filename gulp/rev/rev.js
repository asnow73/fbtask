"use strict";

var config = require("../config.json");
var gulp = require("gulp");
var rev = require("gulp-rev");

module.exports = function (flow) {
    flow
        .pipe(rev())
        .pipe(gulp.dest(config.dist))
        .pipe(rev.manifest("svg-manifest.json"))
        .pipe(gulp.dest(config.dist));
};