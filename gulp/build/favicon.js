"use strict";

var config = require("../config.json");
var gulp = require("gulp");
var favicons = require("gulp-favicons");
var filter = require("gulp-filter");
var svg2png = require("gulp-svg2png");

module.exports = function (target) {
    if (target == config.dev) {
        return gulp.src(config.src + "favicon.svg")
            .pipe(svg2png(64))
            .pipe(gulp.dest(target + "favicons/"));
            //.pipe(gulp.dest(target));

    } else {
        return gulp.src(config.src + "favicon.svg")
            .pipe(svg2png(64))
            .pipe(favicons({
                appName: "Funbox test task",
                appDescription: "This is my application",
                developerName: "",
                developerURL: "",
                background: "transparent",
                path: "/favicons/",
                url: "",
                display: "standalone",
                orientation: "portrait",
                //version: 1.0,
                logging: false,
                online: false,
                html: "favicons.html",
                pipeHTML: true,
                replace: true
            }))
            .pipe(gulp.dest(target + "favicons/"))
            .pipe(filter(function (file) {
                return file.path.endsWith("favicon.ico");
            }))
            .pipe(gulp.dest(target));

    }
};