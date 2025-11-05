export interface OrderCreateInterface {
    customer_id: string;
    farmer_id: string;
    customer_email: string;
    customer_username: string;
    customer_first_name?: string; 
    customer_last_name?: string;  
    customer_phone?: string;      
    farmer_username: string;
    farmer_email: string;
    farm_name: string;
    invoice_id: string;
    total_price: number;
    payment_status: string;
    order_status: string;
    payment_type: string;
    payment_intent_id?: string;
    payment_method_id?: string;
    payment_method?: string;
    payment_expires_at: Date;
    shipping_address?: string;
    shipping_postal_code?: string;
    billing_address?: string;
    delivery_date?: Date | string;
    tracking_url?: string;
    orderItems: OrderItemCreateInterface[];
}

//Every Order Item (product) that contains in order
// Interface for order items (matches the 'order_items' table)
export interface OrderItemCreateInterface {
    // order_item_id?: string, // will be auto-generated
    order_id: string, //UUIDID that belongs to
    product_id: string, // Product Id from Product Service
    product_name: string;       // snapshot
    product_image_url: string;  // snapshot
    product_unit: string; //snapshot
    product_description: string; //snapshot
    quantity: number,
    unit_price: number, 
    total_price: number,
}

// Full order document for database (includes metadata and relations)
export interface OrderDocumentInterface extends OrderCreateInterface{
    order_id?: string; // UUID (Primary key, auto-generated)
    created_at?: Date | string; // TIMESTAMP (Auto-generated)
    updated_at?: Date | string; // TIMESTAMP (Auto-updated)
    orderItems: OrderItemDocumentInterface[];
}

export interface OrderItemDocumentInterface extends OrderItemCreateInterface {
    order_item_id?: string,
    created_at?: Date | string; // TIMESTAMP (Auto-generated)
    updated_at?: Date | string; // TIMESTAMP (Auto-updated)
}

//OrderDocumentINterface can be defined with Omit<OrderCreateInterface, 'orderItems'>
export interface OrderEmailMessageInterface {
    template?: string;
    type?: string;
    orderUrl?: string;
    orderID?: string; //changed
    invoiceID?: string;
    receiverEmail?: string;
    farmerUsername?: string;
    farmerEmail?: string;
    customerUsername?: string;
    customerEmail?: string;
    totalPrice?: number;
    orderItems?: OrderItemDocumentInterface[];
    bothUsers?: boolean;
}