"use strict";

var config = require("../config.json");
var gulp = require("gulp");
var es = require('event-stream');
var inlineAngularTemplates = require("gulp-inline-angular-templates");

module.exports = function (target) {
    return gulp.src([
        config.src + "**/*.html",
        "!" + config.src + "index.html",
        "!" + config.src + "browsers.html"
    ])
    .pipe(inlineAngularTemplates(target + "index.html", {
        base: config.src,
        prefix: "/",
        selector: "body",
        method: "append"
    }))
    .pipe(gulp.dest(target));
};