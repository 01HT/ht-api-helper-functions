"use strict";
const cloudinary = require("cloudinary");

const cloudinaryKey = require("../../../../cloudinary-api-key.json");

cloudinary.config(cloudinaryKey);

async function getImageInfo(public_id) {
  try {
    let promise = new Promise(resolve => {
      cloudinary.v2.api.resource(public_id, function(error, result) {
        if (error) throw new Error(error);
        let imageData = {
          public_id: result.public_id,
          format: result.format,
          version: result.version,
          resource_type: result.resource_type,
          type: result.type,
          created_at: result.created_at,
          bytes: result.bytes,
          width: result.width,
          height: result.height,
          url: result.url,
          secure_url: result.secure_url
        };
        resolve(imageData);
      });
    });

    await promise;

    return promise;
  } catch (error) {
    throw new Error("getImageInfo: " + error.message);
  }
}

export { getImageInfo };
