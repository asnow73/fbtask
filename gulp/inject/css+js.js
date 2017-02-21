"use strict";

var bowerFiles = require("main-bower-files");
var config = require("../config.json");
var gulp = require("gulp");
var fnd = require("filendir");
var inject = require("gulp-inject");

module.exports = function (target) {
    return gulp.src(config.src + "index.html")
        .pipe(inject(gulp.src(bowerFiles()), {
            name: "bower",
            transform: function (filePath, file) {
                fnd.ws(target + filePath, file.contents);
                return inject.transform.apply(inject.transform, arguments);
            }
        }))
        .pipe(inject(gulp.src([
            target + "**/*.css",
            "!" + target + config.bower + "**/*.*",
            target + "**/*.js"
        ], { read: false }), { ignorePath: target }))
        .pipe(gulp.dest(target));
};