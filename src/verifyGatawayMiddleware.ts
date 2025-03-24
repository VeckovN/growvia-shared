import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface payloadGatewayTokenRequest {
    id: string, //Service name => etc. auth, user, order, payment
    iat: number
}

enum serviceNames {
    'auth', 
    'notification',
    'user',
    'order',
    'product'
}

//middleware pased on every request (in each microservices)
export function verifyGateway(req:Request, _res:Response, next:NextFunction):void {
    //check does JWT token exist in request header (req.headers props are lowercase)
    const token = req.headers?.gatewaytoken as string | undefined;
    if(!token){
        throw new Error("Token doesn't exist in request. Invalid request")
    }

    try{
        //GATEWAY_JTW_TOKEN = 294bc0dd5baab813c5f762c3a8bba157 
        //verify JWT token with "GATEWAY_JTW_TOKEN" key
        const verifiedTokenPayload: payloadGatewayTokenRequest = verify(token ,'294bc0dd5baab813c5f762c3a8bba157') as payloadGatewayTokenRequest;
        //check does token.id -> is some name of services ()
        if(!Object.values(serviceNames).includes(verifiedTokenPayload.id)){
            throw new Error("Invalid service name(ID) of the token");
        }
    }
    catch(error){
        throw new Error("Token Verification goes wrong")
    }

    next();
}