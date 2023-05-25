import { NextFunction, Request, RequestHandler, Response } from 'express';
import { sendOkResponse, sendBadRequestResponse } from '../utils/http-status';
import Ajv from 'ajv';
import bcrypt from "bcrypt";
import UserModel from '../models/user.model';

const ajv = new Ajv();

// User schema to validate requested data
const userSchema = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string', minLength: 8 }
    },
    required: ['email', 'password'],
    additionalProperties: false
}
const validate = ajv.compile(userSchema);

/** POST API: Signup for a new user account */
export const signUp = async (req: Request, res: Response) => {
    try {
        // Validate data comes in request body
        const valid = validate(req.body);               
        if(!valid) {
            return sendBadRequestResponse(res, 'Parameters missing.', validate.errors);
        }

        const { email, password } = req.body;

        // Check if user with the same email address already exists or not.
        const existingUser = await UserModel.findOne({ email, isDeleted: false }).exec();
        if(existingUser) return sendBadRequestResponse(res, 'A user with this email address already exists. Please log in instead.', existingUser);
        
        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user 
        const newUser = await UserModel.create({
            email,
            password: hashedPassword
        });

        sendOkResponse(res, 'You have successfully signed up!', newUser);
    } catch(err) {
        console.log('Error: ', err);
        sendBadRequestResponse(res);
    }
};

/** POST API: Login with the email and password into the system */
export const login = async (req: Request, res: Response) => {
    try {
        // Validate data comes in request body
        const valid = validate(req.body);               
        if(!valid) {
            return sendBadRequestResponse(res, 'Parameters missing.', validate.errors);
        }

        const { email, password } = req.body;

        // Find the user with the email provided in request body
        const user = await UserModel.findOne({ email, isDeleted: false }).select("+password +isVerified").exec();
        if(!user) return sendBadRequestResponse(res, "A user with this email address doesn't exists. Please signup first.");

        // Compare user password with the password provided in request body
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) return sendBadRequestResponse(res, "Invalid credentials.");

        // Check if user has verified their account or not.
        if(!user.isVerified) return sendBadRequestResponse(res, "You haven't verified your account. Please verify your account before login into the system.", user);

        // Add user id into session
        req.session.userId = user._id;

        sendOkResponse(res, "Logged in successfully.", user);
    } catch(err) {
        console.log('Error: ', err);
        sendBadRequestResponse(res);
    }
};

/** GET API: Get authenticated user data */
export const getAuthenticatedUser = async (req: Request, res: Response) => {
    try {
        // Get user data from the user id stored in session
        const user = await UserModel.findById(req.session.userId).exec();
        if(!user) return sendBadRequestResponse(res, 'You are not authenticated, please login first.');

        sendOkResponse(res, 'Getting authenticated user successfully.', user);
    } catch(err) {
        console.log('Error: ', err);
        sendBadRequestResponse(res);
    }
};

/** GET API: Logout user - remove logged in user session */
export const logout = (req: Request, res: Response) => {
    // Remove session stored in our database
    req.session.destroy(err => {
        if (err) {
            console.log('Error: ', err);
            sendBadRequestResponse(res);
        } else {
            sendOkResponse(res, "Logout successfully.")
        }
    });
};