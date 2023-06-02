import { Request, Response, NextFunction } from 'express';
import { sendUnAuthorizedResponse, sendBadRequestResponse } from '../utils/http-status';

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
    console.log('req.session: ', req.session);
    if(!req.session.userId) return sendUnAuthorizedResponse(res);
    next();
};