import { Response } from 'express';
import { excludeUnnecessaryFields } from './helper';

interface response {
    success: boolean;
    message: string;
    data: any;
}

//* Send success response
export const sendOkResponse = (res: Response, message: string, data: unknown = null) => {
    data = data ? excludeUnnecessaryFields(data) : data;
    const resObject: response = { success: true, message, data };
    res.status(200).json(resObject);
}

//* Send error response
export const sendBadRequestResponse = (res: Response, message: string = "Something went wrong, please try again later.", data: unknown = null) => {
    data = data ? excludeUnnecessaryFields(data) : data;
    const resObject: response = { success: false, message, data };
    res.status(400).json(resObject);
}

//* Send unauthorized response
export const sendUnAuthorizedResponse = (res: Response, message: string = "User not authenticated.", data: unknown = null) => {
    const resObject: response = { success: false, message, data };
    res.status(401).json(resObject);
}