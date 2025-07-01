enum subscriptionPlanType{
    'None', 'Basic', 'Premium', 'Enterprise'
}

export interface UserLocation{
    country: string,
    city: string,
    address: string,
}

//THERE WILL BE 'userID' that match Authentication 'id' prop
export interface CustomerDocumentInterface{
    userID?: string;
    username?: string;
    email?: string;
    profileAvatarFile?: string;
    profileAvatar?: {
        ulr:string,
        publicID: string,
    };
    fullName?: string;
    location?: UserLocation;
    wishlist?: string[];
    savedFarmes?: number[];
    orderHistroy?: number[];
    purchasedProducts?: number[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface FarmLocation extends UserLocation{
    // country: string,
    // city: string,
    // address: string,
    latitude: string,
    longitude: string,
}

export interface FarmerDocumentInterface { 
    userID?: string;
    username?: string;
    email?: string;
    profileAvatarFile?: string;
    backgroundImageFile?: string;
    profileImagesFile?: string;
    ImageFiles?: {
        profileAvatarFile: string;
        backgroundImageFile: string;
        profileImagesFile: string[];
    }
    profileAvatar?: {
        url: string,
        publicID: string,
    };
    backgroundImage?: {
        url: string,
        publicID: string,
    };
    profileImages?: [
        {
            url: string,
            publicID: string,
        }
    ];
    fullName?: string;
    farmName?: string;
    location?: FarmLocation | null;
    description?: string;
    socialLinks?: string[];
    totalProducts?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}