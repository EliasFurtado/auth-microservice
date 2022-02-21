import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import errorHandler from './middlewares/error-handler.middleware'
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware'
import authorizationRoute from './routes/authorization.routes'
import usersRoute from './routes/users.routes'


dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(authorizationRoute)

app.use(jwtAuthenticationMiddleware)
app.use(usersRoute)

app.use(errorHandler)

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({name: "elias"})
})

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})