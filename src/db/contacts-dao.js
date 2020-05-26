"use strict";
exports.__esModule = true;
exports.ContactsDao = void 0;
var ContactsDao = /** @class */ (function () {
    function ContactsDao(db) {
        this.db = db;
        this.tableName = 'contacts';
    }
    ContactsDao.prototype.insertContact = function (contact) {
        return this.db.table(this.tableName)
            .insert(contact);
    };
    ContactsDao.prototype.updateContact = function (contact) {
        return this.db.table(this.tableName)
            .update(contact)
            .where('name', contact.name);
    };
    ContactsDao.prototype.getAllContacts = function () {
        return this.db.table(this.tableName)
            .select('*');
    };
    ContactsDao.prototype.delContact = function (name) {
        return this.db["delete"]()
            .from(this.tableName)
            .where("name", name);
    };
    return ContactsDao;
}());
exports.ContactsDao = ContactsDao;
