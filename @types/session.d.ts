import mongoose from "mongoose";
import { Session } from "express-session";

declare module "express-session" {
    interface Session {
        userId: mongoose.Types.ObjectId;
    }
}