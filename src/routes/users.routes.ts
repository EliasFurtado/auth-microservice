import { Router, Request, Response } from "express";
import {StatusCodes} from "http-status-codes"


const usersRoute = Router()

usersRoute.get('/users', (req: Request, res: Response) => {
    const users = [{userName: "mimibranca"}]
    res.status(StatusCodes.OK).send(users)
})

usersRoute.get('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    res.status(StatusCodes.OK).send({id})
})

export default usersRoute