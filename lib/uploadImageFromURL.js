"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

let uploadImageFromURL = (() => {
  var _ref = _asyncToGenerator(function* (imageURL, public_id) {
    try {
      const options = { public_id: public_id };

      let promise = new Promise(function (resolve) {
        cloudinary.v2.uploader.upload(imageURL, options, function (error, result) {
          if (error) throw new Error(error);
          resolve(`v${result.version}`);
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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const cloudinary = require("cloudinary");

const cloudinaryKey = require("../../../../cloudinary-api-key.json");

cloudinary.config(cloudinaryKey);

exports.uploadImageFromURL = uploadImageFromURL;