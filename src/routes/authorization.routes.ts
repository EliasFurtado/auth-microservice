import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";


const authorizationRoute = Router()

authorizationRoute.post('/token', async(req: Request, res: Response, next: NextFunction) => {
    try{
        const authorizationHeader = req.headers['authorization']
    
        if(!authorizationHeader) {
            throw new ForbiddenError('Unauthorized')
        }

        const [authenticationType, token] = authorizationHeader.split(' ')

        if (authenticationType !== 'Basic' || !token) {
            throw new ForbiddenError('Invalid authentication type')
        }
        const autorizationContent = Buffer.from(token, 'base64').toString('utf-8')

        const [username, password] = autorizationContent.split(':')

        if(!username || !password) {
            throw new ForbiddenError('Username or password has no provided!')
        }
        const user = await userRepository.findUserByUsernameAndPassword(username, password)
        res.status(StatusCodes.OK).send(user)

    } catch(error) {
        next(error)
    }

})

export default authorizationRoute