"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_functions_1 = require("firebase-functions");
const cloudinary = require("cloudinary");
cloudinary.config(firebase_functions_1.config().cloudinary);
async function deleteFromCDN(public_id, resource_type) {
    try {
        const options = { invalidate: true };
        if (resource_type)
            options.resource_type = resource_type;
        const promise = new Promise(resolve => {
            cloudinary.v2.uploader.destroy(public_id, options, function (error) {
                if (error)
                    throw new Error(error);
                resolve();
            });
        });
        await promise;
    }
    catch (error) {
        throw new Error("deleteFromCDN: " + error.message);
    }
}
exports.deleteFromCDN = deleteFromCDN;
//# sourceMappingURL=deleteFromCDN.js.map