exports.up = async function (knex) {
    await knex.schema.createTable("brands", function (table) {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.string("icon")
        table.specificType('links', 'text ARRAY')
        table.specificType('vkCall', 'text')
    })

    await knex.schema.createTable("users", function (table) {
        table.increments("id").primary()
        table.string('webAppID').notNullable().unique()
        table.string("firstName").notNullable()
        table.datetime('created').notNullable()
        table.string("lastName").notNullable()
        table.string('country').notNullable()
        table.string('avatar')
        table.integer('brandId').notNullable()
        table.enum('role', ['USER', 'ADMIN']).notNullable().defaultTo('USER');

        table.foreign("brandId")
            .references("id")
            .inTable("brands")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    });

    await knex.schema.createTable("categories", function (table) {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.integer('brandId').notNullable()

        table.foreign("brandId")
            .references("id")
            .inTable("brands")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })

    await knex.schema.createTable("fqa", function (table) {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.text('description').notNullable()
        table.integer('brandId').notNullable()

        table.foreign("brandId")
            .references("id")
            .inTable("brands")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })

    await knex.schema.createTable("products", function (table) {
        table.increments("id").primary()
        table.string("similarityId").notNullable()
        table.string("name").notNullable()
        table.specificType('description', 'text')
        table.float('price').unsigned().notNullable()
        table.integer('brandId').notNullable()
        table.integer('categoryId').notNullable()
        table.specificType('images', 'text ARRAY').notNullable()
        table.string('reviewVideo')
        table.string('metaType').notNullable()
        table.specificType('metaData', 'text').notNullable()


        table.foreign("brandId")
            .references("id")
            .inTable("brands")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        table.foreign("categoryId")
            .references("id")
            .inTable("categories")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })

    await knex.schema.createTable("ratingsProduct", function (table) {
        table.increments("id").primary()
        table.integer('productId').notNullable()
        table.integer('userId').notNullable()
        table.integer('score').notNullable()

        table.foreign("productId")
            .references("id")
            .inTable("products")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table.foreign("userId")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })

    await knex.schema.createTable("payments", function (table) {
        table.increments("id").primary()
        table.integer('productId').notNullable()
        table.integer('brandId').notNullable()
        table.integer('userId').notNullable()
        table.datetime('date').notNullable()
        table.boolean('isView').notNullable().defaultTo(true)
        table.enum('status', ['SUCCESS', 'PENDING', 'FAIL']).defaultTo('PENDING').notNullable()
        table.json('servicePayment').notNullable()

        table.foreign("productId")
            .references("id")
            .inTable("products")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table.foreign("userId")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table.foreign("brandId")
            .references("id")
            .inTable("brands")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })
};


exports.down = function (knex) {

};
