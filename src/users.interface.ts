enum subscriptionPlanType{
    'None', 'Basic', 'Premium', 'Enterprise'
}

export interface UserLocation{
    country: string,
    city: string,
    address: string,
}

export interface CustomerDocumentInterface{
    //Base Data (similar as authUser instead of id)
    // id: string | ObjectId(from mongoose)
    id?: string,
    username?:string, //base data
    email?:string, //base data
    profilePicture?: string, //base data
    profilePublicID?: string;
    fullName?: string,
    location?: UserLocation, //General location (Country, City, Zip Code).

    //Depends on user Type:
    wishlist?: string[], //array of products type (From Product Interface) string[Product]
    savedFarmes?: number[], //arrays of farmersId's
    orderHistroy?: number[], //array of customers' past orders.
    purchasedProducts?: number[], //ids of products (Products DB Is mongoDB as well)

    createdAt?: Date | string,
    updatedAt?: Date | string
}

//for map tracking
export interface FarmLocation extends UserLocation{
    // country: string,
    // city: string,
    // address: string,
    latitude: string,
    longitude: string,
}

export interface FarmerDocumentInterface {
    id?:string, //from MongodB (may be different than from Auth)
    username?:string, //same as in Auth
    email?:string, //same as in Auth
    profilePicture?: string, //same as in Auth
    profilePublicID?: string;
    fullName?: string,
    farmName?: string, // Optional for those who operate as a business
    location?: FarmLocation | null, 
    description?: string,
    socialLinks?: string[];
    totalProducts?: number,

    createdAt?: Date | string,
    updatedAt?: Date | string
}