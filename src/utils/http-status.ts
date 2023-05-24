import { Response } from 'express';

interface response {
    success: boolean;
    message: string;
    data: any;
}

//* Send success response
export const sendOkResponse = (res: Response, message: string, data: any = null) => {
    const resObject: response = { success: true, message, data };
    res.status(200).json(resObject);
}

//* Send error response
export const sendBadRequestResponse = (res: Response, message: string = "Something went wrong, please try again later.", data: any = null) => {
    const resObject: response = { success: true, message, data };
    res.status(400).json(resObject);
}