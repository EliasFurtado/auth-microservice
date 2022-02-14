import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";


const authorizationRoute = Router()

authorizationRoute.post('/token',basicAuthenticationMiddleware, async(req: Request, res: Response, next: NextFunction) => {
    try{
        const user = req.user

        if(!user) {
            throw new ForbiddenError('User not provided')
        }

        const jwtPayLoad = {username: user.username}
        const secretKey = 'my_secret_key'
        const jwtOption = {subject: user?.uuid}

        const jwt = JWT.sign(jwtPayLoad, secretKey, jwtOption)
        res.status(StatusCodes.OK).json({token: jwt})

    } catch(error) {
        next(error)
    }

})

export default authorizationRoute