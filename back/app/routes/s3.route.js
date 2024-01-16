const Router = require('express')
const { yup, validate } = require(__dir.libs + '/yup');
const { s3, upload } = require(__dir.libs + '/s3');
const { v4: uuidv4 } = require('uuid');

const Rules = require(__dir.constants + '/rules');
const router = new Router()

router.post('/upload',
    upload.array("files", 5),
    validate({
        headers: {
            // authorization: yup.object().access(['ADMIN'])
        }
    }),
    async (req, res) => {
        if (req.files && req.files.length !== 0) {
            const promisesFiles = []
            req.files.forEach(file => {
                const urlName = uuidv4()
                const encodedBase = Buffer.from(file.buffer, 'base64')
                promisesFiles.push(s3.putObject(__config.s3Bucket, urlName, encodedBase).then(() => 'https://s3.bytewave.space/' + __config.s3Bucket + '/' + urlName))
            });

            const urls = await Promise.all(promisesFiles)
            res.send({ imageUrls: urls })
        }
        res.status(403).json({ type: 'IMAGE_NOT_FOUND', message: 'The image not found' })
    }
)

module.exports = router