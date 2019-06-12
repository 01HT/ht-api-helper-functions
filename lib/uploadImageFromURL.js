"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImageFromURL = undefined;

let uploadImageFromURL = (() => {
  var _ref = _asyncToGenerator(function* (imageURL, public_id) {
    try {
      const options = { public_id: public_id };

      let promise = new Promise(function (resolve) {
        cloudinary.v2.uploader.upload(imageURL, options, function (error, result) {
          if (error) throw new Error(error);
          resolve(result);
        });
      });

      yield promise;

      return promise;
    } catch (error) {
      throw new Error("uploadImageFromURL: " + error.message);
    }
  });

  return function uploadImageFromURL(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _firebaseFunctions = require("firebase-functions");

var functions = _interopRequireWildcard(_firebaseFunctions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const cloudinary = require("cloudinary");

cloudinary.config(functions.config().cloudinary);

exports.uploadImageFromURL = uploadImageFromURL;