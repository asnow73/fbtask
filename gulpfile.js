"use strict";

var config = require("./gulp/config.json");
var gulp = require("gulp");
var webserver = require("gulp-webserver");
var browserSync = require("browser-sync").create();

// Компилирует sass
gulp.task("build:sass", function () {
    return require("./gulp/build/sass")(config.dev);
});

// Отслеживает изменения sass
gulp.task("watch:sass", function () {
    gulp.watch("**/*.scss", { cwd: config.src }, ["build:sass"]);
});

// Инжектирует css и js файлы в index.html
gulp.task("inject:css+js", ["build:sass", "build:js"], function () {
    return require("./gulp/inject/css+js")(config.dev);
});

// Копирует js
gulp.task("build:js", function () {
    return require("./gulp/build/js")(config.dev);
});

// Отслеживает изменения js
gulp.task("watch:js", function () {
    gulp.watch(["**/*.js"], { cwd: config.src }, ["build:js"]);
});

// Генерируем favicon
gulp.task("build:favicon", function() {
    return require("./gulp/build/favicon")(config.dev)
});

// Inject'им favicon
gulp.task("inject:favicon", ["inject:css+js", "build:favicon"], function() {
    return require("./gulp/inject/favicon")(config.dev)
});

// Собирает svg иконки в один файл
gulp.task("build:svg", function () {
    return require("./gulp/build/svg")(config.dev);
});

// Отслеживает изменения svg
gulp.task("watch:svg", function () {
    gulp.watch("**/*.svg", { cwd: config.src }, ["build:svg"]);
});

// Копирует файл страницы с поддерживаемыми браузерами
gulp.task("build:browsers", [], function () {
    return require("./gulp/build/browsers")(config.dev);
});

// Встраивает html-шаблоны в index.html
gulp.task("inject:views", ["inject:css+js"], function () {
    return require("./gulp/inject/views")(config.dev);
});

gulp.task("inject:viewsOnly", function () {
    return require("./gulp/inject/views")(config.dev);
});

// Отслеживает изменения html-шаблонов
gulp.task("watch:views", function () {
    gulp.watch("**/*.html", { cwd: config.src }, ["inject:viewsOnly"]);
});

gulp.task("build", [
    "inject:css+js",
    "build:browsers",
    "build:sass",
    "build:svg",
    "build:favicon",
    "inject:favicon",
    "inject:views"
]);

gulp.task("watch", [
    "watch:sass",
    "watch:sass",
    "watch:js",
    "watch:views"
]);

gulp.task('serve', function(){
    browserSync.init({
        server: 'dev'
    });

    browserSync.watch('dev/**/*.*').on('change', browserSync.reload);
});

gulp.task("default", ["build", "watch", "serve"]);