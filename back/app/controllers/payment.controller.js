const { YooCheckout } = require('@a2seven/yoo-checkout');
const { v4: uuidv4 } = require('uuid');
const { db } = require(__dir.libs + '/db');

const createPayment = async (authorization, productId) => {
    const product = await db('products').where({ id: productId }).first()
    const paymentData = await payment.createPayment({ price: product.price, productName: product.name })


    await db('payments').insert({
        productId: product.id,
        brandId: product.brandId,
        userId: authorization.id,
        servicePaymentId: paymentData.id,
        date: new Date(),
    })

    return paymentData
}

const getPayment = async (id) => {
    const payment = await db('payments').where({ servicePaymentId: id }).first()
    const product = await db('products').where({ id: payment.productId }).first()

    return { ...payment, product }
}

module.exports = {
    createPayment,
    getPayment
}
