import express, { Request, Response } from 'express'

const PORT = 3000
const app = express()

app.get('/', (req: Request, res: Response) => {
    res.status(200).send({name: "elias"})
})

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`)
})