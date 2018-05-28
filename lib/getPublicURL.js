"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPublicURL;
function getPublicURL(filename) {
  return `https://storage.googleapis.com/api-01-ht.appspot.com/${encodeURIComponent(filename)}`;
}