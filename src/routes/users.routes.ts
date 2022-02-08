import { Router, Request, Response } from "express";
import {StatusCodes} from "http-status-codes"
import userRepository from "../repositories/user.repository";


const usersRoute = Router()

usersRoute.get('/users', async(req: Request, res: Response) => {
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).send(users)
})

usersRoute.get('/users/:id', async(req: Request, res: Response) => {
    const id = req.params.id
    const user = await userRepository.findUserById(id)
    res.status(StatusCodes.OK).send({user})
})

usersRoute.post('/users', (req: Request, res: Response) => {
    const newUser = req.body
    res.status(StatusCodes.CREATED).send(newUser)
})

usersRoute.put('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    res.status(StatusCodes.OK).send({id})
})

usersRoute.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    res.sendStatus(StatusCodes.OK)
})

export default usersRoute