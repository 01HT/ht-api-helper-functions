"use strict";
const cloudinary = require("cloudinary");

const cloudinaryKey = require("../../../../cloudinary-api-key.json");

cloudinary.config(cloudinaryKey);

async function uploadImageFromURL(imageURL, public_id) {
  try {
    const options = { public_id: public_id };

    let promise = new Promise(resolve => {
      cloudinary.v2.uploader.upload(imageURL, options, function(error, result) {
        if (error) throw new Error(error);
        resolve(`v${result.version}`);
      });
    });

    await promise;

    return promise;
  } catch (error) {
    throw new Error("uploadImageFromURL: " + error.message);
  }
}

export { uploadImageFromURL };
