"use strict";
exports.__esModule = true;
exports.app = void 0;
var express = require("express");
var routes_1 = require("./routes");
var contacts_1 = require("./routes/contacts");
exports.app = express();
var port = process.env.PORT || 3000;
exports.app.use(routes_1.indexRouter);
exports.app.use(contacts_1.contactsRouter);
exports.app.listen(port, function () {
    console.log('server listening ' + port);
});
