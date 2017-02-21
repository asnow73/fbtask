"use strict";

var config = require("../config.json");
var gulp = require("gulp");

module.exports = function (target) {
    return gulp.src(config.src + "/browsers.html", { base: config.src })
        .pipe(gulp.dest(target));
};