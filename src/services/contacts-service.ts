import {ContactsRepository} from "../db/contacts-repository";
import {DatabaseProvider} from "../db/database-provider";
import {Contact} from "../models/contact";
import {BaseResponse, Status} from "../models/base-response";

const repo = new ContactsRepository(new DatabaseProvider().provideDatabase())

export class ContactsService {

    getAllContacts(){
        return new Promise((res, rej) => {
            repo.getAllContacts().then(contacts => {
                //логика
                console.log('get contacts ' + contacts)
                res(contacts)
            }).catch(error => {
                console.log('DB QUERY error: ' + error)
                rej(error)
            })
        });
    }

    setContact(contact : Contact){
        return new Promise((res, rej) => {
            if (contact.name == '') {
                res('failed to add contact. name is empty')
                return
            }
            repo.insertContact(contact).then(queryRes => {
                res(`inserted ${contact.name}`)
                console.log('inserted ' + res)
            }).catch(error => {
                rej(error)
                console.log('DB QUERY error: ' + error)
            })
        });
    }

    updateContact(contact : Contact){
        return new Promise((res, rej) => {

            repo.updateContact(contact).then(queryRes => {
                res()
                console.log('updated' + res)
            }).catch(error => {
                rej()
                console.log('DB QUERY error: ' + error)
            })
        });
    }

    deleteContact(name : string){
        return new Promise((res, rej) => {

            repo.delContact(name).then(queryRes => {
                if (queryRes == 0) {
                    res(`Could not delete ${name}, not found`)
                } else {
                    res(`deleted ${name}`)
                }
                console.log(`deleted ${name}`)
            }).catch(error => {
                rej()
                console.log(`DB query ERROR ` + error)
            })
        });

    }

}
