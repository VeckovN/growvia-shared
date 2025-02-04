// interface ErrorInterface{
//     message: string;
//     statusCode: number;
//     status: string;
// }

//Pre Defined
// interface Error {
//     name: string,
//     message: string, 
//     stack?: string
// }

export interface CustomErrorInterface extends Error {
    //name exists
    //message exists
    statusCode: number,
    status: string,
    comingFrom: string
}

const createError = (message:string, statusCode: number, comingFrom: string): CustomErrorInterface => {
    //const error = new Error(message); //this will create Error obj but we want CustomError as extends
    const error = new Error(message) as CustomErrorInterface;
    //name and message is already set (with new Error(message));
    error.statusCode = statusCode;
    error.status = "error",
    error.comingFrom = comingFrom;
    return error;
}

// factory functions that construct error objects. (setting statusCode for each case)
export const BadRequestError = (message:string, comingFrom: string): CustomErrorInterface =>
    createError(message, 400, comingFrom);

export const NotAuthorizedError = (message:string, comingFrom: string): CustomErrorInterface =>
    createError(message, 401, comingFrom);

export const NotFoundError = (message:string, comingFrom: string): CustomErrorInterface =>
    createError(message, 404, comingFrom);

export const ConflictError = (message: string, comingFrom: string): CustomErrorInterface =>
    createError(message, 409, comingFrom); // Conflict etc. trying to create a user with an existing email)

export const ServerError = (message:string, comingFrom: string): CustomErrorInterface =>
    createError(message, 503, comingFrom);


//in expres middleware take the error: CustomErroInterface object and return props as a json(response) 
