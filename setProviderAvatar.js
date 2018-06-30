"use strict";
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
var { promisify } = require("es6-promisify");
var rp = require("request-promise");
import { createAvatarThumbnails } from "./createAvatarThumbnails.js";

try {
  admin.initializeApp();
} catch (e) {}

const bucket = admin.storage().bucket();

async function setProviderAvatar(avatarURL, userId) {
  try {
    let tempFilePath = path.join(os.tmpdir(), `${userId}-avatar-temp-file`);

    let file = await rp({
      uri: avatarURL,
      encoding: "binary"
    });

    const fs_writeFile = promisify(fs.writeFile);
    await fs_writeFile(tempFilePath, file, "binary");

    const options = {
      destination: `users/${userId}/avatar.jpg`,
      metadata: {
        contentType: "image/jpeg",
        cacheControl: "no-cache"
      }
    };

    await bucket.upload(tempFilePath, options);

    // Fix remove file lock on windows
    sharp.cache(false);
    fs.unlinkSync(tempFilePath);

    await createAvatarThumbnails(userId);
  } catch (error) {
    throw new Error("setProviderAvatar: " + error.message);
  }
}

export { setProviderAvatar };
