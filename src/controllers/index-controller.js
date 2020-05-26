"use strict";
exports.__esModule = true;
exports.IndexController = void 0;
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.handleIndex = function (req, res) {
        console.log('index requested___');
        res.send('You can use ' +
            '\'GET/getAllContacts\'' +
            ' , \'POST/setContact\'' +
            ' and \'PUT/updateContact\'' +
            ' requests');
    };
    return IndexController;
}());
exports.IndexController = IndexController;
