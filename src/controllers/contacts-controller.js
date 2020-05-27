"use strict";
exports.__esModule = true;
exports.ContactsController = void 0;
var base_response_1 = require("../models/base-response");
var contacts_service_1 = require("../services/contacts-service");
var service = new contacts_service_1.ContactsService();
var ContactsController = /** @class */ (function () {
    function ContactsController() {
    }
    ContactsController.prototype.handleGetAll = function (request, response) {
        service.getAllContacts().then(function (contacts) {
            response.status(200).json(new base_response_1.BaseResponse(contacts, base_response_1.Status.OK));
        })["catch"](function (error) {
            response.status(500).send('DB QUERY error: ' + error);
        });
    };
    ContactsController.prototype.handleSetContact = function (request, response) {
        var contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        };
        service.setContact(contact).then(function () {
            response.status(200).json(new base_response_1.BaseResponse("inserted " + contact.name, base_response_1.Status.OK));
        })["catch"](function (error) {
            response.status(500).send();
        });
    };
    ContactsController.prototype.handleUpdateContact = function (request, response) {
        var contact = {
            name: request.body.name,
            email: request.body.phone,
            phone: request.body.email
        };
        service.updateContact(contact).then(function () {
            response.status(200).json(new base_response_1.BaseResponse("updated " + contact.name, base_response_1.Status.OK));
        })["catch"](function () {
            response.status(500).send();
        });
    };
    ContactsController.prototype.handleDelContact = function (request, response) {
        var name = request.query['name'];
        service.deleteContact(name).then(function (resString) {
            response.status(200).json(new base_response_1.BaseResponse(resString, base_response_1.Status.NO_SUCH_CONTACT));
        })["catch"](function () {
            response.status(500).send();
        });
    };
    return ContactsController;
}());
exports.ContactsController = ContactsController;
