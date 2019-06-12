"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImageInfo = undefined;

let getImageInfo = (() => {
  var _ref = _asyncToGenerator(function* (public_id) {
    try {
      let promise = new Promise(function (resolve) {
        cloudinary.v2.api.resource(public_id, function (error, result) {
          if (error) throw new Error(error);
          let imageData = {
            public_id: result.public_id,
            format: result.format,
            version: result.version,
            resource_type: result.resource_type,
            type: result.type,
            created_at: result.created_at,
            bytes: result.bytes,
            width: result.width,
            height: result.height,
            url: result.url,
            secure_url: result.secure_url
          };
          resolve(imageData);
        });
      });

      yield promise;

      return promise;
    } catch (error) {
      throw new Error("getImageInfo: " + error.message);
    }
  });

  return function getImageInfo(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _firebaseFunctions = require("firebase-functions");

var functions = _interopRequireWildcard(_firebaseFunctions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const cloudinary = require("cloudinary");

cloudinary.config(functions.config().cloudinary);

exports.getImageInfo = getImageInfo;