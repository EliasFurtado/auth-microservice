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

usersRoute.post('/users', async(req: Request, res: Response) => {
    const newUser = req.body
    const id = await userRepository.create(newUser)
    res.status(StatusCodes.CREATED).send(id)
})

usersRoute.put('/users/:id', async(req: Request, res: Response) => {
    const id = req.params.id
    const modifiedUser = req.body
    
    modifiedUser.uuid = id
    
    await userRepository.update(modifiedUser)

    res.status(StatusCodes.OK).send()
})

usersRoute.delete('/users/:id', async(req: Request, res: Response) => {
    const id = req.params.id

    await userRepository.remove(id)
    
    res.sendStatus(StatusCodes.OK)
})

export default usersRoute