const Router = require('express')
const { yup, validate } = require(__dir.libs + '/yup');
const Rules = require(__dir.constants + '/rules');

const controller = require(__dir.controllers + '/product.controller');
const router = new Router()

router.post('/createProduct',
    validate({
        body: {
            name: yup.string().required(),
            price: yup.number().required().positive(),
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
            categoryId: yup.number().required().isNotExists({ tableName: 'categories', field: 'id' }),
            images: yup.array().required().min(1).max(5),
            reviewVideo: yup.string().url(),
            metaData: yup.object(Rules.productTypes.accountKeys),
            description: yup.string().max(600)
        },
        headers: {
            authorization: yup.object().access(['ADMIN'])
        }
    }),
    async (req, res) => {
        const { name, price, brandId, categoryId, images, reviewVideo, metaData, description } = req.body;
        const { authorization } = req.headers

        const data = await controller.createProduct({ name, price, brandId, categoryId, images, reviewVideo, metaData, description })
        res.send(data)
    }
)

router.post('/setRating',
    validate({
        body: {
            productId: yup.number().required().isNotExists({ tableName: 'products', field: 'id' }),
            score: yup.number().integer().min(1).max(5)
        },
        headers: {
            authorization: yup.object().access(['ANY'])
        }
    }),
    async (req, res) => {
        const { productId, score } = req.body;
        const { authorization } = req.headers
        const data = await controller.setRating({ userId: authorization.id, productId, score })
        res.send(data)
    }
)




router.post('/getProducts',
    validate({
        body: {
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
            params: yup.object({ ...Rules.table, filters: yup.object(Rules.productFilter) })
        }
    }),
    async (req, res) => {
        const { brandId, params } = req.body;

        const data = await controller.getProducts(brandId, params)
        res.send(data)
    }
)

router.get('/getProduct',
    validate({
        query: {
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
            id: yup.number().required().isNotExists({ tableName: 'products', field: 'id' })
        },
        headers: {
            authorization: yup.object().access(['ANY'])
        }
    }),
    async (req, res) => {
        const { id, brandId } = req.query;
        const { authorization } = req.headers

        const data = await controller.getProduct(authorization, { brandId, id })
        res.send(data)
    }
)

module.exports = router