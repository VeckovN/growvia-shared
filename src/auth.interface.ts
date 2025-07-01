import { CustomerDocumentInterface, FarmerDocumentInterface } from "./users.interface";

declare global {
    namespace Express {
        interface Request {
            currentUser?: AuthPayloadInterface;
        }
    }
}

export interface AuthPayloadInterface {
    id:string,
    username: string,
    email: string,
    iat?: number,
}
export interface AuthUserInterface {
    id?: string,
    username?: string;  
    password?: string;
    email?: string;
    userType?: 'customer' | 'farmer';
    // cloudinaryProfilePublicId?: string; 
    // profilePicture?: string;
    verificationEmailToken?: string | null; //null after email verification
    resetPasswordToken?: string | null;
    expiresResetPassword?: Date | null; //when time exipres the date should be null
    createdAt?: Date; //could be generated out of interface
}

export interface AuthUserDocumentInterface {
    id?: string,
    username?: string;  
    password?: string;
    email?: string;
    userType?: 'customer' | 'farmer';
    // cloudinaryProfilePublicId?: string; 
    // profilePicture?: string;
    verificationEmailToken?: string | null; //null after email verification
    resetPasswordToken?: string | null;
    expiresResetPassword?: Date | null; 
    deviceType?: string,
    browserName?: string,
    otp?: string,
    otpExpiration?: Date | null,
    createdAt?: Date;
}

export interface AuthUserMessageInterface {
    // id?: number,
    id?: string,
    username?: string;  
    password?: string;
    email?: string;
    userType?: 'customer' | 'farmer';
    // cloudinaryProfilePublicId: string; 
    profilePicture?: string;
    type?: string; //for what type of message -> auth->
}

export interface AuthEmailVerificationInterface {
    receiverEmail?: string,
    template?: string,
    verifyLink?:string
}

export interface AuthUserTypeMessageInterface {
    type: string,
    data:CustomerDocumentInterface | FarmerDocumentInterface
    userType?: 'customer' | 'farmer';
}
