import mongoose from "mongoose";

export interface NotificationInterface {
    type: 'Order' | 'Authentication' | 'General';
    id?: string; //id type of Notification Service DB
    senderID: string | mongoose.Types.ObjectId; //of can be get throught session -> currentUser.id
    senderUsername: string;
    senderEmail?: string;
    receiverID: string | mongoose.Types.ObjectId;
    receiverUsername: string;
    receiverEmail?: string;
    message: string;
    isRead: boolean;
    orderID?: string;
    bothUsers?: boolean;
    createdAt?: Date;
}