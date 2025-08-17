export type NotificationType =
  | "order"
  | "iot"
  | "authentication"
  | "rating"
  | "general"
  | "system";


export interface NotificationUser {
    id: string;
    name: string; //Farmer -> farmName, Customer -> fullName
}

export interface NotificationSender extends NotificationUser {
    avatarUrl: string; 
}

export interface NotificationReceiver extends NotificationUser {
}

export interface OrderNotificationData {
    orderId: string;
    status: string; 
}

export interface IotNotificationData {
    iotStatus: string;
}

export interface NotificationInterface {
    id?: string;
    type: NotificationType;
    sender: NotificationSender;
    receiver: NotificationReceiver;
    message: string;
    isRead: boolean;
    bothUsers?: boolean;

    //Type specific fields - optional
    order?: OrderNotificationData;
    iot?: IotNotificationData;

    createdAt: Date;
    updatedAt: string;
}