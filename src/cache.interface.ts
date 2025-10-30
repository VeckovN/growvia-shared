import { ProductDocumentInterface } from "./product.interface";
import { FarmerDocumentInterface } from "./users.interface";

export interface CacheInvalidationMetadata {
    farmerID?: string,
    farmerName?: string,
    productID?: string,
    [key:string]: string | number | boolean | undefined;
}

export interface CacheInvalidationEventInterface {
    keys: string[];
    timestamp: number;
    service: string;
    metadata?:  CacheInvalidationMetadata;
}

export interface FarmersCacheData {
    messages: string;
    data: FarmerDocumentInterface[];
}

export interface ProductsCacheData {
    messages: string;
    data: ProductDocumentInterface[];
}