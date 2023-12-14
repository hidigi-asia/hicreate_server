import multer from 'multer';
import multerS3 from 'multer-s3';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { S3Client } from '@aws-sdk/client-s3';

const dir = './dist/uploads/';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

var S3_BUCKET = process.env.S3_BUCKET
var S3_REGION = process.env.S3_REGION
var S3_ACCESS_KEY = process.env.S3_ACCESS_KEY
var S3_SECRET_KEY = process.env.S3_SECRET_KEY

const s3 = new S3Client({
    region: S3_REGION,
    credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_KEY
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: S3_BUCKET,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const filename = uuidv4();
            cb(null, filename);
        }
    })
})

export default upload;