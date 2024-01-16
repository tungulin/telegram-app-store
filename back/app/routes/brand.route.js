const Router = require('express')
const { yup, validate } = require(__dir.libs + '/yup');
const Rules = require(__dir.constants + '/rules');
const controller = require(__dir.controllers + '/brand.controller');


const router = new Router()

router.post('/createBrand',
    validate({
        body: {
            name: yup.string().required().isExists({ tableName: 'brands', field: 'name' }),
        },
        headers: {
            authorization: yup.object().access(['ADMIN'])
        }
    }),
    async (req, res) => {
        const { name } = req.body;
        const { authorization } = req.headers

        const data = await controller.createBrand({ name })
        res.send(data)
    }
)

router.get('/getBrand',
    validate({
        query: {
            id: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
        }
    }),
    async (req, res) => {
        const { id } = req.query;

        const data = await controller.getBrand(id)
        res.send(data)
    }
)

router.post('/startVkCall',
    validate({
        body: {
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
            vkCall: yup.string().required()
        },
        headers: {
            authorization: yup.object().access(['ADMIN'])
        }
    }),
    async (req, res) => {
        const { brandId, vkCall } = req.body;
        const { authorization } = req.headers

        const data = await controller.startVkCall(brandId, vkCall)
        res.send(data)
    }
)

router.post('/stopVkCall',
    validate({
        body: {
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
        },
        headers: {
            authorization: yup.object().access(['ADMIN'])
        }
    }),
    async (req, res) => {
        const { brandId, vkCall } = req.body;
        const { authorization } = req.headers

        const data = await controller.stopVkCall(brandId, vkCall)
        res.send(data)
    }
)

router.get('/getVkCall',
    validate({
        query: {
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
        },
        headers: {
            authorization: yup.object().access(['ANY'])
        }
    }),
    async (req, res) => {
        const { brandId } = req.query;

        const data = await controller.getVkCall(brandId)
        res.send(data)
    }
)

router.post('/updateBrand',
    validate({
        body: {
            id: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
            name: yup.string(),
            links: yup.array().of(yup.object(Rules.brand.links))
        },
        headers: {
            authorization: yup.object().access(['ADMIN'])
        }
    }),
    async (req, res) => {
        const { id, name, links } = req.body;
        const { authorization } = req.headers

        const data = await controller.updateBrand(id, { name, links })
        res.send(data)
    }
)

router.delete('/deleteBrand',
    validate({
        body: {
            id: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' })
        },
        headers: {
            authorization: yup.object().access(['ADMIN'])
        }
    }),
    async (req, res) => {
        const { id } = req.body;
        const { authorization } = req.headers

        await controller.deleteBrand(id)
        res.send({ id, isDeleted: true })
    }
)

module.exports = router