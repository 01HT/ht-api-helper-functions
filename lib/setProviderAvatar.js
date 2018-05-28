"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProviderAvatar = undefined;

let setProviderAvatar = (() => {
  var _ref = _asyncToGenerator(function* (avatarURL, userId) {
    try {
      let tempFilePath = path.join(os.tmpdir(), `${userId}-avatar-temp-file`);

      let options = {
        uri: avatarURL,
        encoding: "binary"
      };

      let file = yield rp(options);

      const fs_writeFile = util.promisify(fs.writeFile);
      yield fs_writeFile(tempFilePath, file, "binary");

      const metadata = {
        contentType: "image/jpeg"
      };
      yield bucket.upload(tempFilePath, {
        destination: `users/${userId}/photo.jpg`,
        metadata: metadata
      });
      fs.unlinkSync(tempFilePath);

      return (0, _createAvatarThumbnails.createAvatarThumbnails)(userId);
    } catch (error) {
      throw new Error("setProviderAvatar: " + error.message);
    }
  });

  return function setProviderAvatar(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

try {
  admin.initializeApp();
} catch (e) {}

const bucket = admin.storage().bucket();

exports.setProviderAvatar = setProviderAvatar;