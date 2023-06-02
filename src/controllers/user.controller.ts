import { Request, Response } from 'express';
import { sendOkResponse, sendBadRequestResponse } from '../utils/http-status';
// import Ajv from 'ajv';
import bcrypt from "bcrypt";
import { User } from '../models/user.model';
import { VolunteerInfo } from '../models/volunteer-info.model';

// const ajv = new Ajv();

// // User schema to validate requested data
// const userSchema = {
//     type: 'object',
//     properties: {
//         email: { type: 'string' },
//         password: { type: 'string', minLength: 8 }
//     },
//     required: ['email', 'password'],
//     additionalProperties: false
// }
// const validate = ajv.compile(userSchema);

/** POST API: Signup for a new user account */
export const signUp = async (req: Request, res: Response) => {
    try {
        // Validate data comes in request body
        // const valid = validate(req.body);               
        // if(!valid) {
        //     return sendBadRequestResponse(res, 'Parameters missing.', validate.errors);
        // }

        const objParams: any = req.body;

        // Check if user with the same email address already exists or not.
        const existingUser = await User.findOne({ 
            where: {
                email: objParams.email, 
                isDeleted: false
            }
        });
        if(existingUser) return sendBadRequestResponse(res, 'A user with this email address already exists. Please log in instead.', existingUser);
        
        // Encrypt password
        objParams.password = await bcrypt.hash(objParams.password, 10);

        // Create a new user 
        const newUser = await User.create(objParams);

        await VolunteerInfo.create({
            user_id: newUser.id
        });

        // TODO: Send account verification mail here...

        // Add user id into session
        req.session.userId = newUser.id;

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
        // const valid = validate(req.body);               
        // if(!valid) {
        //     return sendBadRequestResponse(res, 'Parameters missing.', validate.errors);
        // }

        const { email, password, isVolunteer } = req.body;

        // Find the user with the email provided in request body
        const user = await User.findOne({ 
            where: {
                email,
                isVolunteer, 
                isDeleted: false
            }
        });
        if(!user) return sendBadRequestResponse(res, "A user with this email address doesn't exists. Please signup first.");

        // Compare user password with the password provided in request body
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck) return sendBadRequestResponse(res, "Invalid credentials.");

        // Check if user has verified their account or not.
        // if(!user.isVerified) return sendBadRequestResponse(res, "You haven't verified your account. Please verify your account before login into the system.", user);

        // Add user id into session
        req.session.userId = user.id;

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
        const user = await User.findByPk(req.session.userId);
        if(!user) return sendBadRequestResponse(res, 'You are not authenticated, please login first.');

        sendOkResponse(res, 'Getting authenticated user successfully.', user);
    } catch(err) {
        console.log('Error: ', err);
        sendBadRequestResponse(res);
    }
};

/** Authenticate user */
export const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        req.session.userId = userId;

        sendOkResponse(res, "User authenticated successfully.");
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