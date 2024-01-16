const { db } = require(__dir.libs + '/db');


const createFQA = async (data) => {
    return db('fqa')
        .insert(data)
        .returning("*")
        .then(res => res[0])
}

const createCategory = async (data) => {
    return db('categories')
        .insert(data)
        .returning("*")
        .then(res => res[0])
}


const deleteCategory = async (id) => {
    return db('categories')
        .where({ id })
        .del()
}

const getCategories = async (brandId) => {
    return db('categories')
        .where({ brandId })
}


const getFQAs = async (brandId) => {
    return db('fqa').where({ brandId }).select()
}

const getFQA = async (id) => {
    return db('fqa').where({ id }).first()
}

module.exports = {
    createFQA,
    getFQAs,
    getFQA,
    createCategory,
    deleteCategory,
    getCategories
}
