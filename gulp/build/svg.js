"use strict";

var config = require("../config.json");
var cheerio = require("gulp-cheerio");
var gulp = require("gulp");
var svgmin = require("gulp-svgmin");
var svgng = require("gulp-svg-ngmaterial");

module.exports = function (target) {
    return gulp.src(config.src + config.icons + "*.svg")
        .pipe(cheerio({
            run: function ($) {
                $("title").remove();
                $("[fill]").removeAttr("fill");
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgmin())
        .pipe(svgng({ filename: config.svg }))
        .pipe(gulp.dest(target));
};