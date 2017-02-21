"use strict";

var config = require("../config.json");
var del = require("del");

module.exports = function () {
    return del([
        config.dist + config.bower,
        config.dist + "common/",
        config.dist + "controls/",
        config.dist + config.icons,
        config.dist + "pages/",
        config.dist + "providers/",
        config.dist + "*-manifest.json",
        config.dist + config.svg,
        config.dist + "favicon.svg"
    ]);
};