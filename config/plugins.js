"use strict";

/**
 * Module dependencies
 */

const admin = require("firebase-admin");
var serviceAccount = require("./ob2astorage-firebase-adminsdk-7yrbx-b73c1da095.json");
module.exports = {
  init(config) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "gs://ob2astorage.appspot.com",
    });
    const bucket = "gs://ob2astorage.appspot.com";

    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          const path = file.path ? `${file.path}/` : "";
          const filename = `${path}${file.hash}${file.ext}`;
          const buff = Buffer.from(file.buffer, "binary");
          const remoteFile = bucket.file(filename);
          remoteFile.save(
            buff,
            {
              resumable: false,
              contentType: file.mime,
              public: true,
            },
            (err) => {
              if (err) {
                reject(err);
              }
              file.url = `https://storage.googleapis.com/${config.bucket}/${filename}`;
              resolve();
            }
          );
        });
      },
      delete(file) {
        return new Promise((resolve, reject) => {
          const path = file.path ? `${file.path}/` : "";
          const filename = `${path}${file.hash}${file.ext}`;
          const remoteFile = bucket.file(filename);
          remoteFile.delete((err, _) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
      },
    };
  },
};