"use strict";
import {config} from "firebase-functions";
const cloudinary = require("cloudinary");

cloudinary.config(config().cloudinary);

async function getImageInfo(public_id) {
  try {
    const promise = new Promise(resolve => {
      cloudinary.v2.api.resource(public_id, function(error, result) {
        if (error) throw new Error(error);
        const imageData = {
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
