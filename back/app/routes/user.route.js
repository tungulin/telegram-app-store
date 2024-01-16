const Router = require('express')
const { yup, validate } = require(__dir.libs + '/yup');
const Rules = require(__dir.constants + '/rules');

const controller = require(__dir.controllers + '/user.controller');

const router = new Router()

router.post('/loginViaWebApp',
    validate({
        body: {
            webAppID: yup.string().required(),
            firstName: yup.string().required(),
            lastName: yup.string().required(),
            country: yup.string(),
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
            avatar: yup.string()
        },
    }),
    async (req, res) => {
        const { webAppID, firstName, lastName, country, brandId, avatar } = req.body;
        const data = await controller.loginViaWebApp({ webAppID, brandId, firstName, lastName, country, avatar })
        res.send(data)
    }
)

router.post('/testLoginViaWebApp',
    async (req, res) => {
        const data = await controller.testLoginViaWebApp()
        res.send(data)
    }
)

router.post('/getPurchaseHistory',
    validate({
        body: {
            brandId: yup.number().required().isNotExists({ tableName: 'brands', field: 'id' }),
            params: yup.object(Rules.table)
        },
        headers: {
            authorization: yup.object().access(['USER', 'ADMIN'])
        }
    }),
    async (req, res) => {
        const { brandId, params } = req.body;
        const { authorization } = req.headers

        const data = await controller.getPurchaseHistory(authorization, brandId, params)
        res.send(data)
    }
)

router.post('/getPurchaseMeta',
    validate({
        body: {
            id: yup.number().required().isNotExists({ tableName: 'payments', field: 'id' }),
        },
        headers: {
            authorization: yup.object().access(['USER', 'ADMIN'])
        }
    }),
    async (req, res) => {
        const { id } = req.body;
        const { authorization } = req.headers

        const data = await controller.getPurchaseMeta(id)
        res.send(data)
    }
)


module.exports = router