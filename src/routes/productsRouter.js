import { Router } from "express";
import { __dirname } from "../util.js";
import { uploadMiddleware } from '../middlewares/errorHandler.js'
import ProductManager from '../managers/productManager.js'

const router = Router();
const productManager = new ProductManager(__dirname + '/db/products.json');

router.get('/', async(req, res) => {
    try {
    const {limit} = req.query;
    
    if(limit){
        const products = await productManager.listTopN(limit);
        res.status(200).json(products);
    }else{
        const products = await productManager.getProducts();
        res.status(200).json(products);
    }
    
    } catch (error) {
    res.status(500).send({msg: error.message});
    }
});


router.get('/:pid',async(req,res) => {
    try{
        const {pid} = req.params;
        const prodID = Number(pid);
        const product = await productManager.getPoructById(prodID);

            if(product.id == prodID){
                res.status(200).json(product);
            }
            else{
                res.status(400).send({msg:`Product id ${pid} does not exist`})
            }
    }

catch(error){
    res.status(500).send({msg: error.message});
}
})

router.post('/',async(req, res) =>{
    try{
        const prodData = req.body;
        prodData.price = Number(prodData.price);
        prodData.stock = Number(prodData.stock);
        
        const prodThumbs = req.files;
        
        const newProduct = {
            ...prodData,
            status: true,
            thumbnails: []
        }
    if(prodThumbs) prodThumbs.forEach( file => newProduct.thumbnails.push(file.path));
    const addStatus = await productManager.addProduct(newProduct);

    if(addStatus === 'Error: missing parameters'){
        res.status(400).json({msg:`msg: Check ${newProduct.code} parameters: only thumbnails can be emtpy and stock can be 0`});
    }
    else if (addStatus === 'Error: Code exists'){
        res.status(400).json({msg:`Could not create product ${newProduct.code}: code really exists`});
    }
    else{
        res.status(200).json([{msg:`Product ${newProduct.code} created succesfully`}, addStatus]);
    }
}
    catch(error){
        res.status(500).send({msg:error.message});
    }
});

router.put('/:pid', async(req,res) => {
    try{
        const {pid} = req.params;
        const prodID = Number(pid);
        const productUpd = req.body;
        const updStatus = await productManager.updateProduct(prodID, productUpd);
        if(updStatus === 'Error: code already in use') {
            res.status(400).json(updStatus);
        } else if (updStatus === 'Error: product ID not found') {
            res.status(400).json(updStatus);
        } else if (updStatus === 'Error: price must be greater than 0') {
            res.status(400).json(updStatus);
        } else {
            res.status(200).json([{msg: `Product id ${prodID} has been updated`}, updStatus]);
        }
    }

    catch(error){
        res.status(500).send({msg: error.message});
    }
});

router.delete('/:pid', async(req,res) => {

    try{
        const {pid} = req.params;
        const prodID = Number(pid);
        const delStatus = await productManager.deleteProduct(prodID);
        if (delStatus === 'OK') {
            res.status(200).json({msg: `Product id ${prodID} has been deleted`});
        } else {
            res.status(400).json({msg: `Product id ${prodID} does not exists`});
        }
    }
    catch(error){
        res.status(500).send({msg: error.message});
    }
});

export default router;