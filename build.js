"use strict";

var config = require("./gulp/config.json");
var gulp = require("gulp");
var webserver = require("gulp-webserver");

// Удаляет директории для сборки и публикации
gulp.task("clean:all", require("./gulp/clean/all"));

// Копирует файл страницы с поддерживаемыми браузерами
gulp.task("build:browsers", ["clean:all"], function () {
    return require("./gulp/build/browsers")(config.dist);
});

// Компилирует sass
gulp.task("build:sass", ["clean:all"], function () {
    return require("./gulp/build/sass")(config.dist);
});

// js
gulp.task("build:js", ["clean:all"], function () {
    return require("./gulp/build/js")(config.dist);
});

// Инжектирует css и js в index.html
gulp.task("inject:css+js", ["build:sass", "build:js"], function () {
    return require("./gulp/inject/css+js")(config.dist);
});

// Создаем ревизию для mdi.svg
gulp.task("rev:svg", ["clean:all"], function () {
    return require("./gulp/rev/svg")(require("./gulp/build/svg")(config.dist));
});

// Генерируем favicon
gulp.task("build:favicon", ["clean:all"], function() {
  return require("./gulp/build/favicon")(config.dist)
});

// Inject'им favicon
gulp.task("inject:favicon", ["inject:css+js", "build:favicon"], function() {
  return require("./gulp/inject/favicon")(config.dist)
});

// Встраиваем html-шаблоны в index.html
gulp.task("build:views", ["inject:favicon"], function () {
    return require("./gulp/inject/views")(config.dist);
});

// Минифицируем index.html, создает css и js bundles
gulp.task("build:index", ["build:views"], require("./gulp/build/index"));

// Проставляем ревизии файлов
gulp.task("rev:replace", ["build:index", "rev:svg"], require("./gulp/rev/replace"));

// Удаляем временные файлы
gulp.task("clean:temp", ["rev:replace"], require("./gulp/clean/temp"));

// Запускает веб-сервер с минифицированным вариантом сборки
gulp.task("default", ["clean:temp"], function () {
    gulp.src(config.dist)
        .pipe(webserver({
            fallback: "index.html",
            host: "127.0.0.1",
            open: true,
            port: 8003
        }));
});