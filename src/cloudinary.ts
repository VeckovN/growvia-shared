import cloudinary, { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

// overwrite: true	Replaces the existing file with the same public_id.
// overwrite: false	Prevents overwriting an existing file with the same public_id.
// invalidate: true	Clears CDN cache to ensure the latest file is served.
// invalidate: false	Old cached versions may still be served.
export const uploadImage = (
    file: string,
    public_id?: string,
    invalidate?: boolean, 
    overwrite?: boolean 

): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> => {
    return new Promise((resolve) =>{
        cloudinary.v2.uploader.upload(
            file,
            {
                public_id,
                invalidate,
                overwrite,
                resource_type: 'auto' //images, zip
            },
            (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                if (error) 
                    resolve(error);
        
                resolve(result);
            }
        );
    });
}
