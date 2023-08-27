import {dirname} from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));
import {connectString} from './daos/mongodb/connection.js'

import MongoStore from 'connect-mongo';


export const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: connectString,
        crypto: {
            secret: '1234'
        }
    }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
};

import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const createResponse = (res,statusCode,data) => {return res.status(statusCode).json({data});};