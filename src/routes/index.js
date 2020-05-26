"use strict";
exports.__esModule = true;
exports.indexRouter = void 0;
var express = require("express");
var index_controller_1 = require("../controllers/index-controller");
var router = express.Router();
exports.indexRouter = router;
var controller = new index_controller_1.IndexController();
router.get("/", controller.handleIndex);
