const { yup } = require(__dir.libs + '/yup');

const Rules = {}

Rules.productFilter = {
    search: yup.string().default(''),
    category: yup.array().of(yup.object({ id: yup.number() })).default([])
    // minPrice: yup.number().min(0).default(0),
    // maxPrice: yup.number().positive().default(1000000000),
}

Rules.table = {
    offset: yup.number('Offset must be a number')
        .default(0),
    limit: yup.number('Limit must be a number')
        .default(5)
}

Rules.productTypes = {
    accountKeys: {
        login: yup.string().required(),
        password: yup.string().required(),
    }
}

Rules.brand = {
    links: {
        type: yup.string().required(),
        url: yup.string().required(),
    }
}


module.exports = Rules;
