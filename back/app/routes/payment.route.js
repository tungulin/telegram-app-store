const Router = require('express')
const { yup, validate } = require(__dir.libs + '/yup');
const Rules = require(__dir.constants + '/rules');
const controller = require(__dir.controllers + '/payment.controller');


const router = new Router()

router.post('/createPayment',
    validate({
        body: {
            productId: yup.number().required().isNotExists({ tableName: 'products', field: 'id' })
        },
        headers: {
            authorization: yup.object().access(['USER', 'ADMIN'])
        }
    }),
    async (req, res) => {
        const { productId } = req.body;
        const { authorization } = req.headers
        const data = await controller.createPayment(authorization, productId)
        res.send(data)
    }
)

router.get('/getPayment',
    validate({
        query: {
            id: yup.string().required().isNotExists({ tableName: 'payments', field: 'servicePaymentId' })
        },
        headers: {
            authorization: yup.object().access(['USER', 'ADMIN'])
        }
    }),
    async (req, res) => {
        const { id } = req.query;
        const { authorization } = req.headers
        const data = await controller.getPayment(id)
        res.send(data)
    }
)

router.post('/notification',
    async (req, res) => {
        const { productId } = req.body;
        const { authorization } = req.headers
        const data = await controller.createPayment(authorization, productId)
        res.send(data)
    }
)

module.exports = router