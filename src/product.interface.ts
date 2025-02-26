import { ObjectId } from "mongoose";

//allowed units
const UNIT_TYPES = ["piece", "kg", "g", "liter", "ml"] as const;
export type UnitType = (typeof UNIT_TYPES)[number];  //10 kg, 


//props for creating product
export interface ProductCreateInterface {
    farmerID: string | ObjectId;  //Relation with Users Service DB ()
    name: string;
    images?: string[];
    description: string;
    shortDescription: string;
    categories: string;
    subCategories: string[];
    price: number;
    stock: number;
    // stock: {
    //     quantity: number;
    //     unit: UnitType;
    // }
    unit: UnitType; // "piece", "kg", "g", etc.
    tags: string[];
}

export interface ProductDocumentInterface { 
    _id?: string | ObjectId;
    //ElasticSearch doesn't accept '_id' so it's converted to 'id' 
    id?: string | ObjectId;
    // username: string;
    farmerID?: string | ObjectId; //id from other mongooDB db (Users -> from Users Service)
    name: string;
    images?: string[]; //more product's images
    description: string;
    shortDescription?: string;
    categories: string; //main category names
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