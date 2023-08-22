import express from 'express';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo'
import passport from 'passport';

import './passport/localStrategy'
import './passport/githubStrategy'

import productsRouter from './routes/productsRouter.js';
import userRouter from './routes/userRouter.js';
import viewRouter from './routes/viewsRouter.js'

import './daos/mongodb/connection.js'
import { uploadMiddleware } from './middlewares/errorHandler.js';
import { initMongoDB } from './daos/mongodb/connection.js';
import {connectString } from './daos/mongodb/connection.js';

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectString,
        crypto:{
            secret:'1234'
        }
    }),
    secret: '1234',
    cookie:{
        sameSite:true
    },
    resave: false,
    saveUninitialized: false,
    cookie:{}
}

initMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(uploadMiddleware)

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productsRouter)
app.use('/', viewRouter);
app.use('/users', userRouter);



app.listen(8080, ()=>{
    console.log(`Server listening on port 8080}`);
})