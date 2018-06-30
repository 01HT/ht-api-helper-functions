"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createThumbnail = undefined;

let createThumbnail = (() => {
  var _ref = _asyncToGenerator(function* (width, fileName, metadata) {
    try {
      const data = yield bucket.file(fileName).download();
      let file = data[0];

      const tempOutputFile = path.join(os.tmpdir(), `temp-create-thumbnail-file-output-${uuidv4()}.jpg`);

      yield sharp(file).resize(width).max().background({ r: 255, g: 255, b: 255, alpha: 1 }).flatten().jpeg({ quality: 100, progressive: true }).toFile(tempOutputFile);

      const parsedFilename = path.parse(fileName);
      const thumbFileName = `${parsedFilename.root}${parsedFilename.dir}/${parsedFilename.name}-${width}w.jpg`;

      const options = {
        destination: thumbFileName,
        metadata: {
          contentType: "image/jpeg",
          cacheControl: "no-cache"
        }
      };

      if (metadata) options.metadata = metadata;

      yield bucket.upload(`${tempOutputFile}`, options);

      // Fix remove file lock on windows
      sharp.cache(false);

      fs.unlinkSync(tempOutputFile);

      return (0, _getPublicURL.getPublicURL)(thumbFileName);
    } catch (error) {
      throw new Error("createThumbnail: " + error.message);
    }
  });

  return function createThumbnail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

var _path = require("path");

var path = _interopRequireWildcard(_path);

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _os = require("os");

var os = _interopRequireWildcard(_os);

var _getPublicURL = require("./getPublicURL.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sharp = require("sharp");

const uuidv4 = require("uuid/v4");

try {
  admin.initializeApp();
} catch (e) {}

const bucket = admin.storage().bucket();

exports.createThumbnail = createThumbnail;