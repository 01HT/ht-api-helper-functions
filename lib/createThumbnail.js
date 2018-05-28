"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

var _path = require("path");

var path = _interopRequireWildcard(_path);

var _sharp = require("sharp");

var sharp = _interopRequireWildcard(_sharp);

var _getPublicURL = require("./getPublicURL.js");

var _getPublicURL2 = _interopRequireDefault(_getPublicURL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

try {
  admin.initializeApp();
} catch (e) {}

const bucket = admin.storage().bucket();

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (width, fileName, metadata) {
    try {
      const options = {
        metadata: {
          contentType: "image/jpeg"
        }
      };
      if (metadata) options.metadata = metadata;

      const parsedFilename = path.parse(fileName);
      const thumbFileName = `${parsedFilename.root}${parsedFilename.dir}/${parsedFilename.name}-${width}w.jpg`;

      // Create write stream for uploading thumbnail
      const thumbnailUploadStream = bucket.file(thumbFileName).createWriteStream(options);

      // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
      const pipeline = sharp();

      pipeline.resize(width).max().jpeg({
        quality: 100,
        progressive: true
      }).pipe(thumbnailUploadStream);

      bucket.file(fileName).createReadStream().pipe(pipeline);

      const streamAsPromise = new Promise(function (resolve, reject) {
        return thumbnailUploadStream.on("finish", resolve).on("error", reject);
      });

      return streamAsPromise.then(function (_) {
        return (0, _getPublicURL2.default)(thumbFileName);
      });
    } catch (error) {
      throw new Error("createThumbnail: " + error.message);
    }
  });

  function createThumbnail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return createThumbnail;
})();