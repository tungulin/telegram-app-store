global.ENV = process.env.NODE_ENV || 'prod'

global.__dir = {
    root: __dirname,
    app: __dirname + '/app',
    controllers: __dirname + '/app/controllers',
    constants: __dirname + '/app/constants',
    routes: __dirname + '/app/routes',
    libs: __dirname + '/app/libs',
    helpers: __dirname + '/app/helpers',
    data: __dirname + '/app/data',
    config: __dirname + '/config',
}

global.__config = require(__dir.config + '/' + ENV + '/config');

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const { db } = require(__dir.libs + '/db');
const cronHelper = require(__dir.helpers + '/cron');
const YooMoneyPayment = require(__dir.libs + '/paymentServices/yoomoney');

const productRoutes = require(__dir.routes + '/product.route')
const brandRoutes = require(__dir.routes + '/brand.route')
const mainRoutes = require(__dir.routes + '/main.route')
const userRoutes = require(__dir.routes + '/user.route')
const paymentRoutes = require(__dir.routes + '/payment.route')
const s3Routes = require(__dir.routes + '/s3.route')

require('dotenv').config()


const app = express()

app.use(bodyParser.json({ limit: '20mb', extended: true }))
app.use(cors())
app.use(express.json());

app.use('/brand', brandRoutes)
app.use('/main', mainRoutes)
app.use('/product', productRoutes)
app.use('/user', userRoutes)
app.use('/payment', paymentRoutes)
app.use('/s3', s3Routes)

const start = async () => {
    try {
        app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
        await db.migrate.latest();

        global.payment = YooMoneyPayment

        cronHelper.start()
    }
    catch (e) {
        console.log('error', e);
    }
}

start()