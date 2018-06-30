"use strict";
import * as admin from "firebase-admin";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
var sharp = require("sharp");
import { getPublicURL } from "./getPublicURL.js";
const uuidv4 = require("uuid/v4");

try {
  admin.initializeApp();
} catch (e) {}

const bucket = admin.storage().bucket();

async function createThumbnail(width, fileName, metadata) {
  try {
    const data = await bucket.file(fileName).download();
    let file = data[0];

    const tempOutputFile = path.join(
      os.tmpdir(),
      `temp-create-thumbnail-file-output-${uuidv4()}.jpg`
    );

    await sharp(file)
      .resize(width)
      .max()
      .background({ r: 255, g: 255, b: 255, alpha: 1 })
      .flatten()
      .jpeg({ quality: 100, progressive: true })
      .toFile(tempOutputFile);

    const parsedFilename = path.parse(fileName);
    const thumbFileName = `${parsedFilename.root}${parsedFilename.dir}/${
      parsedFilename.name
    }-${width}w.jpg`;

    const options = {
      destination: thumbFileName,
      metadata: {
        contentType: "image/jpeg",
        cacheControl: "no-cache"
      }
    };

    if (metadata) options.metadata = metadata;

    await bucket.upload(`${tempOutputFile}`, options);

    // Fix remove file lock on windows
    sharp.cache(false);

    fs.unlinkSync(tempOutputFile);

    return getPublicURL(thumbFileName);
  } catch (error) {
    throw new Error("createThumbnail: " + error.message);
  }
}

export { createThumbnail };
