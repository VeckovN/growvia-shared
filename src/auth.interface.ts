declare global {
    namespace Express {
        interface Request {
            currentUser?: AuthPayloadInterface;
        }
    }
}

export interface AuthPayloadInterface {
    id:number,
    username: string,
    email: string,
    iat?: number,
}
export interface AuthUserInterface {
    id?: number,
    username?: string;  
    password?: string;
    email?: string;
    cloudinaryProfilePublicId?: string; 
    profilePicture?: string;
    verificatioEmailToken?: string | null; //null after email verification
    resetPasswordToken?: string | null;
    exipresResetPassword?: Date | null; //when time exipres the date should be null
    // createdAt?: Date; //could be generated out of interface
}

export interface AuthUserDocumentInterface{
    id: number,
    username: string;  
    password: string;
    email: string;
    cloudinaryProfilePublicId: string; 
    profilePicture: string;
    verificatioEmailToken: string | null; //null after email verification
    resetPasswordToken: string | null;
    exipresResetPassword: Date | null; 
    deviceType: string,
    browserName: string,
    otp: string,
    otpExpiration: Date | null,
    createdAt: Date;
}

export interface AuthUserMessageInterface {
    id?: number,
    username?: string;  
    password?: string;
    email?: string;
    // cloudinaryProfilePublicId: string; 
    profilePicture?: string;
    type?: string; //for what type of message -> auth->
}

export interface AuthEmailVerificationInterface {
    receiverEmail?: string,
    template?: string,
    verifyLink?:string
}