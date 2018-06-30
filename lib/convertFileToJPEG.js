"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convertFileToJPEG = undefined;

let convertFileToJPEG = (() => {
    var _ref = _asyncToGenerator(function* (tempFilePath, fileName) {
        try {
            // let tempFilePath = path.join(
            //   os.tmpdir(),
            //   `convert-file-to-jpeg-${uuidv4()}`
            // );
            // file.pipe(fs.createWriteStream(tempFilePath));

            // const fs_writeFile = promisify(fs.writeFile);
            // await fs_writeFile(tempFilePath, file, "binary");

            // const readFile = promisify(fs.readFile);
            // let data = await readFile(tempFilePath);
            console.log(4);
            const tempOutputFile = path.join(os.tmpdir(), `temp-avatar-file-output-${uuidv4()}.jpg`);
            console.log(5);
            console.log(tempFilePath);
            console.log(tempOutputFile);

            // let promise = new Promise(resolve => {
            //   setTimeout(() => {
            //     console.log(111);
            //     resolve();
            //   }, 3000);
            // });

            // await promise;
            // console.log(222);

            yield sharp(tempFilePath).max().background({ r: 255, g: 255, b: 255, alpha: 1 }).flatten().jpeg({ quality: 100, progressive: true }).toFile(tempOutputFile);

            const options = {
                destination: fileName,
                metadata: {
                    cacheControl: "no-cache",
                    contentType: "image/jpeg"
                }
            };
            console.log(6);
            yield bucket.upload(`${tempOutputFile}`, options);
            // let promise = new Promise(resolve => {
            //   setTimeout(() => {
            //     resolve();
            //   }, 4000);
            // });
            // await promise;
            console.log(7);
            // fs.unlinkSync(tempFilePath);
            // fs.unlinkSync(tempOutputFile);
            // console.log("ok");
            // const promise = new Promise((resolve, reject) => {
            //   sharp(tempFilePath)
            //     .max()
            //     .background({ r: 255, g: 255, b: 255, alpha: 1 })
            //     .flatten()
            //     .jpeg({ quality: 100, progressive: true })
            //     .toFile(`${tempFilePath}`, function(err) {

            //     });
            // });

            // return promise;

            // .pipe(fileUploadStream);

            // console.log(12);
            // Create write stream for uploading file

            // const fileUploadStream = bucket.file(fileName).createWriteStream(options);

            // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
            // const pipeline = sharp();

            // sharp(tempFilePath)
            //   .max()
            //   .background({ r: 255, g: 255, b: 255, alpha: 1 })
            //   .flatten()
            //   .jpeg({ quality: 100, progressive: true })
            //   .pipe(fileUploadStream);
            // console.log(13);

            // bucket
            //   .file(tempFilePath)
            //   .createReadStream()
            //   .pipe(pipeline);

            // console.log(15);
            // return streamAsPromise;
        } catch (error) {
            throw new Error("convertFileToJPEG: " + error.message);
        }
    });

    return function convertFileToJPEG(_x, _x2) {
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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sharp = require("sharp");
// var { promisify } = require("es6-promisify");
const uuidv4 = require("uuid/v4");

try {
    admin.initializeApp();
} catch (e) {}

const bucket = admin.storage().bucket();

exports.convertFileToJPEG = convertFileToJPEG;