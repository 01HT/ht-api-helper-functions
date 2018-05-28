"use strict";
import * as admin from "firebase-admin";
import * as path from "path";
import * as sharp from "sharp";
import getPublicURL from "./getPublicURL.js";

try {
  admin.initializeApp();
} catch (e) {}

const bucket = admin.storage().bucket();

async function createThumbnail(width, fileName, metadata) {
  try {
    const options = {
      metadata: {
        contentType: "image/jpeg"
      }
    };
    if (metadata) options.metadata = metadata;

    const parsedFilename = path.parse(fileName);
    const thumbFileName = `${parsedFilename.root}${parsedFilename.dir}/${
      parsedFilename.name
    }-${width}w.jpg`;

    // Create write stream for uploading thumbnail
    const thumbnailUploadStream = bucket
      .file(thumbFileName)
      .createWriteStream(options);

    // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
    const pipeline = sharp();

    pipeline
      .resize(width)
      .max()
      .jpeg({
        quality: 100,
        progressive: true
      })
      .pipe(thumbnailUploadStream);

    bucket
      .file(fileName)
      .createReadStream()
      .pipe(pipeline);

    const streamAsPromise = new Promise((resolve, reject) =>
      thumbnailUploadStream.on("finish", resolve).on("error", reject)
    );

    return streamAsPromise.then(_ => {
      return getPublicURL(thumbFileName);
    });
  } catch (error) {
    throw new Error("createThumbnail: " + error.message);
  }
}

export { createThumbnail };
