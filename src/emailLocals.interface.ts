import { OrderItemDocumentInterface } from './order.interface';

export interface EmailLocalsInterface {
    template?: string, 
    receiverEmail?: string, 
    username?: string, 
    verifyLink?: string,
    resetLink?: string,
    appLink?: string,
    appIcon?: string,
    sender?: string
    orderUrl?: string; 
    orderID?: number;
    invoiceID?: string; //created on client side wiht react-pdf
    farmerUsername?: string;
    farmerEmail?: string;
    customerUsername?: string;
    customerEmail?: string;
    totalPrice?: number;
    orderItems?: OrderItemDocumentInterface[];
}