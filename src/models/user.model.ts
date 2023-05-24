import { InferSchemaType, model, Schema } from 'mongoose';

// export interface userInterface {
//     email: String;
//     password: String;
//     isVerified: Boolean;
//     isDeleted: Boolean;
// }

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isVerified: { type: Boolean, required: true, default: false, select: false },
    accountAccessCode: { type: String, required: false, select: false },
    passwordRecoveryCode: { type: String, required: false, select: false },
    isDeleted: { type: Boolean, required: true, default: false, select: false },
}, {
    timestamps: true
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);

