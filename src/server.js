import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import './daos/mongodb/connection.js'
import { uploadMiddleware } from './middlewares/errorHandler.js';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(uploadMiddleware)
app.use(morgan('dev'))


app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
})