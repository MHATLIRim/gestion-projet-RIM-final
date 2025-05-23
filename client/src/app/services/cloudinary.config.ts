import { Cloudinary } from '@cloudinary/url-gen';

// Configuration robuste avec vérification
const cloudinaryConfig = {
  cloud: {
    cloudName: 'dgk2f48s2' //_NOM_CLOUD
  }
};

export const cld = new Cloudinary(cloudinaryConfig);
export const CLOUD_NAME = cloudinaryConfig.cloud.cloudName;