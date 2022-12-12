import '#config/database.js'
import '#config/maildev.js'
import respond from "koa-respond"
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { API_V1_ROUTER } from '#routes/index.js'
const app = new Koa()

app
.use(bodyParser())
.use(respond())
.use(API_V1_ROUTER.routes())
.use(API_V1_ROUTER.allowedMethods())
app.listen(process.env.PORT,() => console.log(`server listen to port : ${process.env.PORT}`))