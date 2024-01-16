const jwt = require('jsonwebtoken')
const { db } = require(__dir.libs + '/db');
const { generateTable } = require(__dir.helpers + '/utils');
const aes256 = require("aes256")

const loginViaWebApp = async (data) => {
    try {

        let user = await db('users').where({ webAppID: data.webAppID }).first()

        if (!user) {
            user = await db('users')
                .insert({ ...data, created: new Date() })
                .returning("*")
                .then(res => res[0])
        }

        return { ...user, jwtToken: jwt.sign({ id: user.id, role: user.role, brandId: user.brandId }, process.env.TOKEN_SECRET, { expiresIn: '1d' }) }

    } catch (error) {
        console.log('loginViaWebApp', error);
    }
}

const testLoginViaWebApp = async () => {
    const user = await db('users').first()
    return { ...user, jwtToken: jwt.sign({ id: user.id, role: user.role, brandId: user.brandId }, process.env.TOKEN_SECRET, { expiresIn: '1d' }) }
}

const getPurchaseHistory = async (authorization, brandId, params) => {
    const query = db('payments')
        .options({ nestTables: true })
        .leftJoin('products ', 'products.id', 'payments.productId')
        .where((builder) => {
            builder.where('payments.userId', authorization.id)
            builder.andWhere('payments.brandId', brandId)
            builder.andWhere('isView', true)
            builder.andWhere('status', 'SUCCESS')
        })
        .select('payments.id', 'products.name', 'price', 'images', 'metaType', 'metaData', 'status',)


    return generateTable(query, params)
}

const getPurchaseMeta = async (id) => {
    const purchase = await db('payments').where({ id }).first()
    const product = await db('products').where({ id: purchase.productId }).first()

    return aes256.decrypt(process.env.PRODUCT_SECRET, product.metaData)
}




module.exports = {
    loginViaWebApp,
    testLoginViaWebApp,
    getPurchaseHistory,
    getPurchaseMeta
}
