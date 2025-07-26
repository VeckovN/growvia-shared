import { SearchHit, Field, QueryDslRangeQuery } from "@elastic/elasticsearch/lib/api/types";

export interface SearchResultInterface{
    hits: SearchHit[];
    total?: number;
}

export interface SearchHitTotalInterface {
  value: number;
  relation: string;
}

export interface ProductSerachOptionsInterface {
    query?: string;
    category?: string;
    subCategories?: string[];
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    quantity?: number;
    unit?: string;
    from?: number; // Pagination offset
    size?: number; // Items per page
    sort?: 'newest' | 'price_asc' | 'price_desc' | 'available'
}


export interface PaginatePropsInterface {
    size: number; //count of returned items
    from: string; //page number (from ) -> 0 is first page
    type: string;//sortBy (order return), or other examples "popular", "latest", "discounted", "recommended
} 

export interface QueryStringInterface {
    fields: string[];
    query: string;
}

//additional term props
// export interface TermInterface {
//     active: boolean;
// }

//should be defined because the 'range' is pushed later and it doesn't match the inferred type 
export interface ElasticQueryInterface {
    query_string?: QueryStringInterface,
    range?: Partial<Record<Field, QueryDslRangeQuery>>;
    // term?: TermInterface
}