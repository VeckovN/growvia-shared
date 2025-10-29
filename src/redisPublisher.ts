import { createClient } from 'redis';
import { winstonLogger } from './winstonLoger';
import { Logger } from 'winston';

type RedisClientType = ReturnType<typeof createClient>;

export interface CacheInvalidationEventInterface {
    keys: string[];
    timestamp: number;
    service: string;
}

let publisherClient: RedisClientType | null = null;
let serviceName: string = 'unknown-serviceName' 
let logger:Logger;

//must be called before anything else -> the logger got initialzied
export const initializeCachePublisher = async(
    redisUrl: string, 
    service: string,
    elasticsearchUrl?: string
): Promise<void> => {
    try{

        const esUrl = elasticsearchUrl || 'http://easticsearch_container:9200'

        serviceName = service;
        logger = winstonLogger(
            esUrl,
            `${serviceName}-cachePublisher`,
            'debug'
        )

        publisherClient = createClient({ url: redisUrl})

        publisherClient.on('error', (error) =>{
            logger.error('Redis Publisher error:', error);
        })

        await publisherClient.connect();
        logger.info(`Cache invalidation publisher initialized for ${serviceName}`);
    }
    catch(error){
        logger?.error('Failed to initialize cache publisher:', error);
        throw error;
    }
}


//keys -> keys Array of cache keys to invalidate (supports wildcards like "category:*")
export const publishCacheInvalidation = async(keys:string[]):Promise<void> =>{
    if(!publisherClient || !publisherClient.isOpen){
        logger?.warn('Publisher not initialized, skipping cache invalidation');
        return;
    }
    try{
        const event: CacheInvalidationEventInterface = {
            keys,
            timestamp: Date.now(),
            service: serviceName
        }

        publisherClient.publish('cache:invalidate', JSON.stringify(event));
        logger?.info(`Published cache invalidation for keys: ${keys.join(', ')}`);
    }
    catch(error){
        logger?.error('Failed to publish cache invalidation:', error);
        // Don't throw error - cache invalidation failure shouldn't break business logic
    }
}


export const disconnectCachePublisher = async():Promise<void> => {
    if(publisherClient && publisherClient.isOpen){
        await publisherClient.quit();
        logger?.info('Cache invalidation publisher disconnected');
        publisherClient = null;
    }
}


//Check if publisher is ready
export const isCachePublisherReady = (): boolean => {
    return publisherClient !==null && publisherClient.isOpen;
}
