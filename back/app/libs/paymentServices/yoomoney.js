const { YooCheckout } = require('@a2seven/yoo-checkout');
const { v4: uuidv4 } = require('uuid');

class YooMoneyPayment {
    #connection

    constructor() {
        this.#connection = new YooCheckout({ shopId: 274837, secretKey: 'test_yOEoGFEj-4FKZR4fQ13gxOquXmbAwuNiqbBQhU2p2NY' });
    }

    async createPayment({ price, productName }) {
        try {
            const idempotenceKey = uuidv4()

            const createPayload = {
                capture: true,
                amount: { value: price, currency: 'RUB' },
                description: `Покупка товара: ${productName} `,
                payment_method_data: { type: 'bank_card' },
                confirmation: { type: 'redirect', return_url: 'https://vk.com/app51776422' }
            }

            const payment = await this.#connection.createPayment(createPayload, idempotenceKey)

            return {
                id: payment.id,
                status: payment.status,
                confirmation: payment.confirmation,
            }

        } catch (error) {
            console.log('createPayment', error);
        }
    }

    async getPaymentList({ status }) {
        return this.#connection.getPaymentList({ status })
    }
}

module.exports = new YooMoneyPayment();