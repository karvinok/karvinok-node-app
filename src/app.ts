import express = require('express')
import {indexRouter}  from "./routes"
import {contactsRouter} from "./routes/contacts"

export const app = express()
const port = process.env.PORT || 3000

app.use(indexRouter)
app.use(contactsRouter)
app.listen(port, ()=> {
    console.log('server listening ' + port)
})

