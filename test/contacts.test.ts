import {Contact} from "../src/models/contact";
import {expect, assert} from "chai";
import chai from 'chai';
import chaiHttp = require('chai-http');
import {Status} from "../src/models/base-response";

chai.use(chaiHttp)
chai.should()

const baseUrl = 'http://localhost:3000'

describe('Contacts controller requests', () => {

    describe('Set contact function', () => {
        let method = '/set-contact'

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
                    res.body.status.should.equal(Status.OK)
                    res.body.data.should.equal('failed to add contact. name is empty')
                    done()
                })
        });
    });

    describe('Get all contacts function', () => {
        let method = '/get-contacts'

        it("should return status 200 and array", (done) => {

            chai.request(baseUrl)
                .get(method)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body.data).to.be.a('array')
                    done()
                })
        });
    });

    describe('Update contact function', () => {
        let method = '/update-contact'

        it('should not update contact if name is not found', (done) => {
            let contact: Contact = {
                email: "Dimon@email.com", name: "Dimon", phone: "123123123"
            }

            chai.request(baseUrl)
                .put(method)
                .send(contact)
                .end((err, res) => {

                    expect(res).to.have.status(200)
                    expect(res.body.data).to.equal(`Could not update ${contact.name}, name not found`)
                    done()
                })
        });

        /*it('should not update contact with empty or non-existing name', (done) => {
            let contact: Contact = {
                email: "Test@email.com", name: "Test", phone: "00000"
            }

            chai.request(baseUrl)
                .put(method)
                .send(contact)
                .end((err, res) => {
                    console.log(res.body);

                    expect(res).to.have.status(200)
                    expect(res.body.data).to.equal(`updated ${contact.name}`)
                    done()
                })
        });*/
    });
});

