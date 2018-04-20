module.exports.createThumbnail = async function(
  width,
  fileName,
  thumbFileName,
  metadata
) {
  try {
    const options = {};
    if (metadata) options.metadata = metadata;

    // Create write stream for uploading thumbnail
    const thumbnailUploadStream = bucket
      .file(thumbFileName)
      .createWriteStream(options);

    // Create Sharp pipeline for resizing the image and use pipe to read from bucket read stream
    const pipeline = sharp();
    pipeline
      .resize(width)
      .max()
      .pipe(thumbnailUploadStream);

    bucket
      .file(fileName)
      .createReadStream()
      .pipe(pipeline);

    const streamAsPromise = new Promise((resolve, reject) =>
      thumbnailUploadStream.on("finish", resolve).on("error", reject)
    );

    await streamAsPromise;
    return `https://storage.googleapis.com/api-01-ht.appspot.com/${encodeURIComponent(
      thumbFileName
    )}`;
  } catch (error) {
    throw new Error("createThumbnail: " + error.message);
  }
};
