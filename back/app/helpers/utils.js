const generateTable = (query, params) => {
    if (params?.offset) {
        query.offset(params.offset)
    }

    if (params?.limit) {
        query.limit(params.limit)
    }

    return query
}

module.exports = {
    generateTable
}