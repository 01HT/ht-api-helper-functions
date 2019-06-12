"use strict";
import * as functions from "firebase-functions";
const cloudinary = require("cloudinary");

cloudinary.config(functions.config().cloudinary);

async function uploadImageFromURL(imageURL, public_id) {
  try {
    const options = { public_id: public_id };

    let promise = new Promise(resolve => {
      cloudinary.v2.uploader.upload(imageURL, options, function(error, result) {
        if (error) throw new Error(error);
        resolve(result);
      });
    });

    await promise;

    return promise;
  } catch (error) {
    throw new Error("uploadImageFromURL: " + error.message);
  }
}

export { uploadImageFromURL };
