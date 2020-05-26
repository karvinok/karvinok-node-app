import {ContactsController} from "../src/controllers/contacts-controller";
import {Contact} from "../src/models/contact";
import {expect} from "chai";
import {DatabaseProvider} from "../src/db/database-provider";
import {ContactsDao} from "../src/db/contacts-dao";

const dao = new ContactsDao(new DatabaseProvider().provideDatabase())

describe('Insert contact function', () => {
    it("should insert a contact", (done) => {
        let contact: Contact = {
            email: "someContact@gmail.com", name: "Cont", phone: "123"
        }
        //todo find best way to test controllers.
        /*dao.insertContact(contact).then((res) => {
            console.log(res)
            expect(res  != undefined)
            done()
        }).catch((error)=>{
            console.log(error)
            done()
        })*/
    });
    it("should not insert a contact without name", (done) => {
        let contact: Contact = {
            email: "", name: "", phone: ""
        }
        //todo test controller...
        /*dao.insertContact(contact).then((res) => {
            console.log(res)
            done()
        }).catch((error)=>{
            console.log(error)
            done()
        })*/
    });
});
