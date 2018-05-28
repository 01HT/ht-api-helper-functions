"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProviderAvatar = undefined;

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _os = require("os");

var os = _interopRequireWildcard(_os);

var _path = require("path");

var path = _interopRequireWildcard(_path);

var _util = require("util");

var util = _interopRequireWildcard(_util);

var _requestPromise = require("request-promise");

var rp = _interopRequireWildcard(_requestPromise);

var _createAvatarThumbnails = require("./createAvatarThumbnails.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

try {
  admin.initializeApp();
} catch (e) {}

var bucket = admin.storage().bucket();

async function setProviderAvatar(avatarURL, userId) {
  try {
    var tempFilePath = path.join(os.tmpdir(), userId + "-avatar-temp-file");

    var options = {
      uri: avatarURL,
      encoding: "binary"
    };

    var file = await rp(options);

    var fs_writeFile = util.promisify(fs.writeFile);
    await fs_writeFile(tempFilePath, file, "binary");

    var metadata = {
      contentType: "image/jpeg"
    };
    await bucket.upload(tempFilePath, {
      destination: "users/" + userId + "/photo.jpg",
      metadata: metadata
    });
    fs.unlinkSync(tempFilePath);

    return (0, _createAvatarThumbnails.createAvatarThumbnails)(userId);
  } catch (error) {
    throw new Error("setProviderAvatar: " + error.message);
  }
}

exports.setProviderAvatar = setProviderAvatar;