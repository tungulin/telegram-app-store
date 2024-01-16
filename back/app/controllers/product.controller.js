const { db } = require(__dir.libs + '/db');
const { generateTable } = require(__dir.helpers + '/utils');
const { v4: uuidv4 } = require('uuid');
const aes256 = require("aes256")

const createProduct = async (data) => {
    const similarityId = uuidv4()
    const metaType = 'accountKeys'
    data.metaData = aes256.encrypt(process.env.PRODUCT_SECRET, JSON.stringify(data.metaData))

    return db('products')
        .insert({ ...data, similarityId, metaType })
        .returning("*")
        .then(res => res[0])
}

const setRating = async ({ userId, productId, score }) => {
    return db('ratingsProduct')
        .insert({ userId, productId, score })
        .returning("*")
        .then(res => res[0])
}

const getProducts = async (brandId, params) => {
    const { filters } = params
    const categoriesId = filters.category.map(item => item.id)

    const query = db('products').where((builder) => {
        builder.whereLike('name', `%${filters.search}%`)
        categoriesId.length > 0 && builder.whereIn('categoryId', categoriesId)
    })

    return generateTable(query, params)
}

const getProduct = async (authorization, { brandId, id }) => {
    const rating = await db('ratingsProduct').where({ productId: id }).avg('score').first()
        .then(resp => resp.avg ? Number(Number(resp.avg).toFixed(1)) : 0)

    const countUser = await db('ratingsProduct').where({ productId: id }).count('id').first()
        .then(resp => Number(resp.count))

    const isBoughtProduct = await db('payments')
        .where({ productId: id, userId: authorization.id, status:'SUCCESS'})
        .first()
        .then(resp => !!resp)

    const personalUserRating = await db('ratingsProduct')
        .where({ productId: id, userId: authorization.id })
        .first()
        .then(resp => resp?.score ? resp.score : 0)

    const data = await db('products').where({ brandId, id }).first()

    return { ...data, rating: { score: rating, countUser, personalUserRating }, isBoughtProduct }
}

module.exports = {
    createProduct,
    setRating,
    getProducts,
    getProduct
}
