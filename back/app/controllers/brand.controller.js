const { db } = require(__dir.libs + '/db');
const { generateTable } = require(__dir.helpers + '/utils');


const createBrand = async (data) => {
    return db('brands')
        .insert(data)
        .returning("*")
        .then(res => res[0])
}

const deleteBrand = async (id) => {
    return db('brands')
        .where({ id })
        .del()
}

const updateBrand = async (id, data) => {
    return db('brands')
        .where({ id })
        .update(data)
        .returning("*")
        .then(res => res[0])
}



const getBrand = async (id) => {
    return db('brands')
        .where({ id })
        .first()
}

const startVkCall = async (brandId, vkCall) => {
    return db('brands')
        .where({ id: brandId })
        .update({ vkCall })
        .returning("*")
        .then(res => res[0])
}

const stopVkCall = async (brandId) => {
    return db('brands')
        .where({ id: brandId })
        .update({ vkCall: null })
        .returning("*")
        .then(res => res[0])
}

const getVkCall = async (id) => {
    const brand = await db('brands').where({ id }).first()
    return { call: brand.vkCall }
}

module.exports = {
    createBrand,
    deleteBrand,
    updateBrand,
    getBrand,
    startVkCall,
    stopVkCall,
    getVkCall
}
