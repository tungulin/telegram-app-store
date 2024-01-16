const Router = require('express')
const { yup, validate } = require(__dir.libs + '/yup');
const Rules = require(__dir.constants + '/rules');

const controller = require(__dir.controllers + '/main.controller');
const router = new Router()

router.post('/createFQA',
    validate({
        body: {
            name: yup.string().required(),
            description: yup.string().required(),
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
        },
        headers: {
            authorization: yup.object().access(['ADMIN'])
        }
    }),
    async (req, res) => {
        const { name, description, brandId } = req.body;
        const { authorization } = req.headers

        const data = await controller.createFQA({ name, description, brandId })
        res.send(data)
    }
)

router.post('/createCategory',
    validate({
        body: {
            name: yup.string().required().isExists({ tableName: 'categories', field: 'name' }),
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' })
        },
        headers: {
            authorization: yup.object().access(['ADMIN'])
        }
    }),
    async (req, res) => {
        const { name, brandId } = req.body;
        const { authorization } = req.headers

        const data = await controller.createCategory({ name, brandId })
        res.send(data)
    }
)

router.get('/getCategories',
    validate({
        query: {
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' })
        }
    }),
    async (req, res) => {
        const { brandId } = req.query;
        const { authorization } = req.headers

        const data = await controller.getCategories(brandId)
        res.send(data)
    }
)

router.get('/getFQAs',
    validate({
        query: {
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
        },
        //todo
        // headers: {
        //     authorization: yup.object().access(['ANY'])
        // }
    }),
    async (req, res) => {
        const { brandId } = req.query;
        // const { authorization } = req.headers
        const data = await controller.getFQAs(brandId)
        res.send(data)
    }
)

router.get('/getFQA',
    validate({
        query: {
            id: yup.number().required().isNotExists({ tableName: 'fqa', field: 'id' }),
        }
    }),
    async (req, res) => {
        const { id } = req.query;
        const data = await controller.getFQA(id)
        res.send(data)
    }
)


module.exports = router