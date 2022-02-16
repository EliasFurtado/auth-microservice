import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";

import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {

    try {
        const authorizationHeader = req.headers['authorization']

        if(!authorizationHeader){
            throw new ForbiddenError('Unauthorized')
        }

        const [authenticationType, token] = authorizationHeader.split(' ')

        if(authenticationType !== 'Bearer' && !token) {
            throw new ForbiddenError('Invalid authentication type')
        }

        const tokenPayload = JWT.verify(token, 'my_secret_key')

        if(typeof tokenPayload !== 'object' || !tokenPayload.sub){
            throw new ForbiddenError('Invalid token')
        }

        const user = {
            id: tokenPayload.sub,
            username: tokenPayload.username
        }

        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

export default bearerAuthenticationMiddleware