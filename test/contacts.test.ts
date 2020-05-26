import {ContactsController} from "../src/controllers/contacts-controller";
import {Contact} from "../src/models/contact";
import {expect, assert} from "chai";
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import {Status} from "../src/models/base-response";

chai.use(chaiHttp)
chai.should()

const baseUrl = 'http://localhost:3000'

describe('Contacts controller requests', () => {
    let method = ''

    describe('Set contact function', () => {
        method = '/set-contact'

        it("should insert a contact and answer 200", (done) => {
            let contact: Contact = {
                email: "someTestContact@gmail.com", name: "TestContact", phone: "123"
            }
            chai.request(baseUrl)
                .post(method)
                .send(contact)
                .end((err, res) => {
                    //assertion type
                    assert.equal(res.status, 200)
                    assert.equal(res.body.data, `inserted ${contact.name}`)

                    done()
                })
        });

        it("should not insert a contact without name", (done) => {
            let contact: Contact = {
                email: "", name: "", phone: ""
            }
            chai.request(baseUrl)
                .post(method)
                .send(contact)
                .end((err, res) => {
                    //should type
                    res.should.not.have.status(200)
                    res.status.should.not.equal(Status.OK)
                    res.body.data.should.equal('failed to add contact. name is empty')
                    done()
                })
        });
    });

    /*describe('Get all contacts function', () => {
        method = '/get-contacts'

        it("should get all contacts", (done) => {
            let contact: Contact = {
                email: "someTestContact@gmail.com", name: "TestContact", phone: "123"
            }

            chai.request(baseUrl)
                .post(method)
                .send(contact)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.not.equals('')
                    done()
                })
        });
    });*/
});

