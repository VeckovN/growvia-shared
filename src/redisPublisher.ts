import { createClient } from 'redis';
import { winstonLogger } from './winstonLoger';
import { Logger } from 'winston';
import { CacheInvalidationEventInterface, CacheInvalidationMetadata } from './cache.interface';

type RedisClientType = ReturnType<typeof createClient>;

let publisherClient: RedisClientType | null = null;
let serviceName: string = 'unknown-serviceName' 
let logger:Logger;

export const initializeCachePublisher = async(
    redisUrl: string, 
    service: string,
    elasticsearchUrl?: string
): Promise<void> => {
    try{
        const esUrl = elasticsearchUrl || 'http://easticsearch_container:9200'

        serviceName = service;
        logger = winstonLogger(esUrl, `${serviceName}-cachePublisher`, 'debug')

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

export const publishCacheInvalidation = async(
    keys:string[],
    metadata?: CacheInvalidationMetadata
):Promise<void> =>{
    if(!publisherClient || !publisherClient.isOpen){
        logger?.warn('Publisher not initialized, skipping cache invalidation');
        return;
    }
    try{
        const event: CacheInvalidationEventInterface = {
            keys,
            timestamp: Date.now(),
            service: serviceName,
            metadata
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

export const isCachePublisherReady = (): boolean => {
    return publisherClient !==null && publisherClient.isOpen;
}
