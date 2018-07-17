"use strict";
const cloudinary = require("cloudinary");

const cloudinaryKey = require("../../../../cloudinary-api-key.json");

cloudinary.config(cloudinaryKey);

async function deleteFromCDN(public_id) {
  try {
    const options = { invalidate: true };

    let promise = new Promise(resolve => {
      cloudinary.v2.uploader.destroy(public_id, options, function(error) {
        if (error) throw new Error(error);
        resolve();
      });
    });

    await promise;
  } catch (error) {
    throw new Error("deleteFromCDN: " + error.message);
  }
}

export { deleteFromCDN };
