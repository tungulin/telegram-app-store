const yup = require('yup');
const jwt = require('jsonwebtoken')
const { checkIsExistsValue, checkIsNotExistsValue } = require(__dir.helpers + '/validations');

yup.setLocale({
    mixed: {
        notType: 'The ${path} is incorrect ${type}',
        required: 'The ${path} is required',
    },
    string: {
        email: 'The ${path} should be a email'
    },
})

yup.addMethod(yup.ObjectSchema, 'access', function (roles) {
    return this.transform(value => jwt.verify(value, process.env.TOKEN_SECRET, (err, decoded) => err ? {} : decoded))
        .test('isAccess', 'Invalid token authorization', function (value) {
            if (!value?.id) return this.createError({ message: 'Invalid token authorization' })
            if (!roles.includes('ANY') && !roles.includes(value.role)) return this.createError({ message: 'Permission denied' })

            return value
        })
})

yup.addMethod(yup.Schema, 'isNotExists', function (args) {
    const { tableName, field } = args
    const where = {}

    return this.test('checkIsNotExists', 'The ${path} is not registered', (value) => {
        where[field] = value
        return checkIsNotExistsValue({ tableName, where })
    })
})

yup.addMethod(yup.Schema, 'isExists', function (args) {
    const { tableName, field } = args
    const where = {}

    return this.test('checkIsExists', 'The ${path} is registered', (value) => {
        where[field] = value
        return checkIsExistsValue({ tableName, where })
    })
})

const validate = (schema) => async (req, res, next) => {
    try {
        const data = await yup.object({
            query: yup.object(schema.query),
            body: yup.object(schema.body),
            params: yup.object(schema.params),
            headers: yup.object(schema.headers),
        }).validate({
            query: req.query,
            params: req.params,
            body: req.body,
            headers: req.headers
        });
        req.params = data.params
        req.body = data.body
        req.headers.authorization = data.headers.authorization

        return next();
    } catch (err) {
        return res.status(403).json({ type: err.name, message: err.message });
    }
};

module.exports = { yup, validate }