// The application requires Porstreg SQL and Minio S3. Here you need to register your config. It's best to use an ENV file
module.exports = {
    s3Bucket: '',
    connections: {
        pg: {
            client: '',
            host: '',
            user: '',
            password: '',
            database: ''
        },
        minio: {
            endPoint: '',
            port: '',
            accessKey: '',
            secretKey: '',
            useSSL: false
        }
    }
}
