const Minio = require('minio')
const multer = require("multer");
const multerS3 = require("multer-s3")

const minioClient = new Minio.Client(__config.connections.minio)
const storage = multer.memoryStorage()

module.exports = {
    s3: minioClient,
    upload: multer({ storage: storage })
};