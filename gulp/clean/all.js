"use strict";

var config = require("../config.json");
var del = require("del");

module.exports = function () {
    return del([config.dist]);
};