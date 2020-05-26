"use strict";
exports.__esModule = true;
exports.ContactsController = void 0;
var contacts_dao_1 = require("../db/contacts-dao");
var database_provider_1 = require("../db/database-provider");
var dao = new contacts_dao_1.ContactsDao(new database_provider_1.DatabaseProvider().provideDatabase());
var ContactsController = /** @class */ (function () {
    function ContactsController() {
    }
    ContactsController.prototype.handleGetAll = function (request, response) {
        dao.getAllContacts().then(function (contacts) {
            response.json(contacts);
            console.log('get contacts ' + contacts);
        })["catch"](function (error) {
            response.send('DB QUERY error: ' + error);
            console.log('DB QUERY error: ' + error);
        });
    };
    ContactsController.prototype.handleSetContact = function (request, response) {
        var contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        };
        if (contact.name == '') {
            response.json('please enter the contact name');
            return;
        }
        dao.insertContact(contact).then(function (res) {
            response.send("inserted " + contact.name);
            console.log('inserted ' + res);
        })["catch"](function (error) {
            response.send('DB QUERY error: ' + error);
            console.log('DB QUERY error: ' + error);
        });
    };
    ContactsController.prototype.handleDelContact = function (request, response) {
        var name = request.query['name'];
        dao.delContact(name).then(function (res) {
            response.send(res == 0 ? "Could not delete " + name + ", not found" : "deleted " + name);
        })["catch"](function (error) {
            response.status(400);
            response.send('DB QUERY error: ' + error);
            console.log('DB QUERY error: ' + error);
        });
    };
    ContactsController.prototype.handleUpdateContact = function (request, response) {
        var contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        };
        dao.updateContact(contact).then(function (res) {
            response.send("updated " + contact.name);
            console.log('updated' + res);
        })["catch"](function (error) {
            response.send('DB QUERY error: ' + error);
            console.log('DB QUERY error: ' + error);
        });
    };
    return ContactsController;
}());
exports.ContactsController = ContactsController;
