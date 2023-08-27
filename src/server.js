import express, {json, urlencoded} from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import '../src/passport/localStrategy.js'
import '../src/passport/githubStrategy.js'
import 'dotenv/config'

import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartsRouter.js'
import userRouter from './routes/userRouter.js';
import viewRouter from './routes/viewsRouter.js'

import './daos/mongodb/connection.js'
import { uploadMiddleware } from './middlewares/errorHandler.js';
import {connectString , initMongoDB} from './daos/mongodb/connection.js';
import morgan from 'morgan';


initMongoDB();

const app = express();

app
    .use(json())
    .use(urlencoded({extended: true}))
    .use(uploadMiddleware)
    .use(morgan("dev"))

    .engine('handlebars',handlebars.engine())
    .set('views',__dirname+'/views')
    .set('view engine', 'handlebars')

    .use(cookieParser())
    .use(session(mongoStoreOptions))

    .use(passport.initialize())
    .use(passport.session())

    .use('/api/products', productsRouter)
    .use("/api/carts", cartRouter)
    .use('/users', userRouter)
    .use('/', viewRouter)

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}}`);
})