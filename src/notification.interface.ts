export interface NotificationInterface {
    id?: string; //id type of Notification Service DB
    orderID: string;
    senderID: string; //of can be get throught session -> currentUser.id
    senderUsername: string;
    senderEmail?: string;
    receiverID: string; 
    receiverUsername: string;
    receiverEmail?: string;
    message: string;
    isRead: boolean;
    type?: string;
    bothUsers?: boolean;
    createdAt?: Date;
}