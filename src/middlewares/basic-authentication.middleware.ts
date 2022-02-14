import { NextFunction, Request, Response } from "express"
import ForbiddenError from "../models/errors/forbidden.error.model"
import userRepository from "../repositories/user.repository"

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
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
            throw new ForbiddenError('Username or password not provided!')
        }
        const user = await userRepository.findUserByUsernameAndPassword(username, password)

        if(!user) {
            throw new ForbiddenError('Invalid password or username')
        }
        
        req.user = user
        next()
    } catch (error) {
        next(error)
        
    }
}

export default basicAuthenticationMiddleware