"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const sizes = [256, 128, 64, 32];

async function createAvatarThumbnails(userId) {
  try {
    let fileName = `users/${userId}/avatar.jpg`;
    const promises = [];
    for (const width of sizes) {
      promises.push(createThumbnail(width, fileName));
    }
    await Promise.all(promises);
  } catch (error) {
    throw new Error("createAvatarThumbnails: " + error.message);
  }
};

exports.createAvatarThumbnails = createAvatarThumbnails;