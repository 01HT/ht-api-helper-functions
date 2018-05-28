"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const sizes = [256, 128, 64, 32];

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (userId) {
    try {
      let fileName = `users/${userId}/avatar.jpg`;
      const promises = [];
      for (const width of sizes) {
        promises.push(createThumbnail(width, fileName));
      }
      yield Promise.all(promises);
    } catch (error) {
      throw new Error("createAvatarThumbnails: " + error.message);
    }
  });

  function createAvatarThumbnails(_x) {
    return _ref.apply(this, arguments);
  }

  return createAvatarThumbnails;
})();