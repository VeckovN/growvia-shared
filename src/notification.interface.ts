export interface NotificationInterface {
    id?: string; //id type of Notification Service DB
    senderID: string; //of can be get throught session -> currentUser.id
    senderUsername: string;
    senderEmail?: string;
    receiverID: string; 
    receiverUsername: string;
    receiverEmail?: string;
    type: 'Order' | 'Authentication' | 'General';
    message: string;
    isRead: boolean;
    orderID?: string;
    bothUsers?: boolean;
    createdAt?: Date;
}

