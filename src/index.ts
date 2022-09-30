import express from 'express'
import router_create from "./routes/create-route";
import cors from 'cors'

const app = express()
const jsonBodyMiddleWare = express.json()

let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors())

const port = 2525

app.use(jsonBodyMiddleWare)

app.use(router_create)

app.listen(port, () => {
    console.log('Server success starter in port : ' + port)
})