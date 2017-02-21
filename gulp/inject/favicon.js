"use strict";

var config = require("../config.json");
var gulp = require("gulp");
var fs = require("fs");
var inject = require("gulp-inject");
var through = require("through2");

module.exports = function (target) {
    return gulp.src(target + "index.html")
        .pipe(through.obj(function (file, enc, cb) {
            var tag = "<!-- inject:favicons:html -->";
            var favicons = null;
            target == config.dev ?
                favicons = '<link rel="icon" type="image/png" href="/favicons/favicon.png">' :
                favicons = fs.readFileSync(target + "favicons/favicons.html", "utf-8");
            var html = file.contents.toString("utf-8");
            file.contents = new Buffer(html.replace(tag, tag + favicons));
            cb(null, file);
        }))
        .pipe(gulp.dest(target));

};