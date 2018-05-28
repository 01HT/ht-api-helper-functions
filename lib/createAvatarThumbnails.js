"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var sizes = [256, 128, 64, 32];

async function createAvatarThumbnails(userId) {
  try {
    var fileName = "users/" + userId + "/avatar.jpg";
    var promises = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = sizes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var width = _step.value;

        promises.push(createThumbnail(width, fileName));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    await Promise.all(promises);
  } catch (error) {
    throw new Error("createAvatarThumbnails: " + error.message);
  }
};

exports.createAvatarThumbnails = createAvatarThumbnails;