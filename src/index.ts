import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import usersRoute from './routes/users.routes'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(usersRoute)

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({name: "elias"})
})

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})