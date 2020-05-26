"use strict";
exports.__esModule = true;
exports.ContactsController = void 0;
var contacts_dao_1 = require("../db/contacts-dao");
var database_provider_1 = require("../db/database-provider");
var base_response_1 = require("../models/base-response");
var dao = new contacts_dao_1.ContactsDao(new database_provider_1.DatabaseProvider().provideDatabase());
var ContactsController = /** @class */ (function () {
    function ContactsController() {
    }
    //todo replace response body to base obj
    ContactsController.prototype.handleGetAll = function (request, response) {
        dao.getAllContacts().then(function (contacts) {
            response.status(200).json(new base_response_1.BaseResponse(contacts, base_response_1.Status.OK));
            console.log('get contacts ' + contacts);
        })["catch"](function (error) {
            response.status(500).send('DB QUERY error: ' + error);
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
            response.status(400).json(new base_response_1.BaseResponse('failed to add contact. name is empty', base_response_1.Status.EMPTY_NAME));
            return;
        }
        dao.insertContact(contact).then(function (res) {
            response.status(200).json(new base_response_1.BaseResponse("inserted " + contact.name, base_response_1.Status.OK));
            console.log('inserted ' + res);
        })["catch"](function (error) {
            response.status(500).send('DB QUERY error: ' + error);
            console.log('DB QUERY error: ' + error);
        });
    };
    ContactsController.prototype.handleDelContact = function (request, response) {
        var name = request.query['name'];
        dao.delContact(name).then(function (res) {
            if (res == 0) {
                response.status(200).json(new base_response_1.BaseResponse("Could not delete " + name + ", not found", base_response_1.Status.NO_SUCH_CONTACT));
            }
            else {
                response.status(200).json(new base_response_1.BaseResponse("deleted " + name, base_response_1.Status.OK));
            }
        })["catch"](function (error) {
            response.status(500).send('DB QUERY error: ' + error);
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
            response.status(200).json({
                message: "updated " + contact.name
            });
            console.log('updated' + res);
        })["catch"](function (error) {
            response.send('DB QUERY error: ' + error);
            console.log('DB QUERY error: ' + error);
        });
    };
    return ContactsController;
}());
exports.ContactsController = ContactsController;
