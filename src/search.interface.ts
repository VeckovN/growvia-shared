import { SearchHit } from "@elastic/elasticsearch/lib/api/types";

export interface SearchResultInterface{
    hits: SearchHit[]
}