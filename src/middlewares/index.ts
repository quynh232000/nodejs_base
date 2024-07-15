import express from 'express';
import { get, identity, merge } from 'lodash';
import  jwt  from 'jsonwebtoken';
import { CustomRequest } from '../type/express';

export const isOwner = async (req: express.Request, res: express.Response,  next: express.NextFunction) => {
    try {
        const { id } = req.params
        const currentUserId = get(req, 'identity._id') as string

        if(!currentUserId){
            return res.status(403).json({status: false, message: ""})
        }
        if(currentUserId.toString() !== id){
            return res.sendStatus(403)
        }
        next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}


export const isAuthenticated = async (req: CustomRequest, res: express.Response, next: express.NextFunction) => {
    try {
        
        const headerToken = req.headers['authorization']
        if(!headerToken) return res.status(403).json({status:false,message:'Required header authorization!'})
        const token = headerToken.split(' ')[1]

        if(!token){
            return res.status(403).json({status: false, message: "Token not found"})
        }
        const data = jwt.verify(token,'secretkey1');
        if(!data) return res.status(403).json({status: false, message:"Unauthorized"})
        req.user  = data
    

        next()
    } catch (error) {
        console.error(error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: false, message: "Token expired", error });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ status: false, message: "Invalid token", error });
        } else {
            return res.status(400).json({ status: false, message: "Server error", error });
        }
    }
}