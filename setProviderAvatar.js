"use strict";
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
// import * as util from "util";
// import * as rp from "request-promise";
// var util = require("util");
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

    let options = {
      uri: avatarURL,
      encoding: "binary"
    };

    let file = await rp(options);

    const fs_writeFile = promisify(fs.writeFile);
    await fs_writeFile(tempFilePath, file, "binary");

    const metadata = {
      contentType: "image/jpeg"
    };
    await bucket.upload(tempFilePath, {
      destination: `users/${userId}/avatar.jpg`,
      metadata: metadata
    });
    fs.unlinkSync(tempFilePath);

    return createAvatarThumbnails(userId);
  } catch (error) {
    throw new Error("setProviderAvatar: " + error.message);
  }
}

export { setProviderAvatar }