import { ObjectId } from "mongoose";

//allowed units
export const UNIT_TYPES = ["piece", "kg", "g", "liter", "ml"] as const;
export type UnitType = (typeof UNIT_TYPES)[number];  //10 kg, 


export interface ProductCreateInterface {
    farmerID: string;
    name: string;
    images?: 
        string []  //for passing to the upload method (ase64 format -> client form)
        |
        {  // results type of cloudinary uploaded images
            url: string,
            publicID: string
        }[] ,
    description: string;
    shortDescription: string;
    category: string;
    subCategories: string[];
    price: number;
    stock: number;
    unit: UnitType; // "piece", "kg", "g", etc.
    tags: string[];
}

export interface ProductDocumentInterface { 
    _id?: string | ObjectId;
    //ElasticSearch doesn't accept '_id' so it's converted to 'id' 
    id?: string | ObjectId;
    name: string;
    images?: [{ 
        url: string,
        publicID: string
    }];
    description: string;
    shortDescription?: string;
    category: string; //main category names
    subCategories?: string[]; //more catergories that is also relevant
    price: number;
    stock: number; //piece, kg,
    unit: UnitType;
    tags: string[];
    createdAt?: Date | string;

    toJSON?: () => unknown;

    // //When the Review Service created
    // //Rating system (the product can be rated by customer)
    // ratingsCount?: number;  
    // raingSum?: number;
    // ratingCategories?: RatingCategoriesInterface;
}   


//how the unit works:
//piece" → For individual items (e.g., eggs, milk bottles).
//"kg", "g" → For weight-based products (e.g., wheat, corn, flour).
//"liter", "ml" → For liquids (e.g., milk, oil).

// unit = "kg", then stockQuantity = 50 means 50 kg of flour is available.
// If unit = "piece", then stockQuantity = 20 means 20 bottles of milk are available.