const { db } = require(__dir.libs + '/db');

const start = () => {
    _checkPayments()
}

const _checkPayments = async () => {
    setInterval(async () => {
        const paymentData = await payment.getPaymentList({ status: 'succeeded' })
        const paymentsId = paymentData.items.map(item => item.id)
        await db('payments')
            .whereIn('servicePaymentId', paymentsId)
            .update({ status: 'SUCCESS' })
    }, 15000)
}

module.exports = {
    start
}