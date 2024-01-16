const { db } = require(__dir.libs + '/db');


const checkIsExistsValue = async ({ tableName, where }) => {
    const valueDB = await db(tableName).where(where).first()

    if (valueDB)
        return false

    return true
}

const checkIsNotExistsValue = async ({ tableName, where }) => {
    const valueDB = await db(tableName).where(where).first()
    if (!valueDB)
        return false

    return true
}




module.exports = {
    checkIsExistsValue,
    checkIsNotExistsValue
}