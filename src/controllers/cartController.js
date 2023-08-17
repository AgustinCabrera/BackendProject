import * as service from "../services/cartServices.js"

export const getAll = async (req,res,next) => {
    try {
        const response = await service.getAll();
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}
export const getById = async (req,res,next) => {
    try {
        const {id} = req.params
        const cart = await service.getById(id);
        if(cart){
            res.status(200).json(cart)
        }else {
            res.status(200).json({message:"Cart not found"});
        }
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const create = async (req,res,next) => {
    try {
        const newCart = await service.create();
        res.status(201).json(newCart);
    } catch (error) {
        next(error)
    }
}

export const addProductToCart = async (req, res, next) => {
    try {
        const {id,idProduct} = req.params
        const cart = await service.addProductToCart(id,idProduct)

        if(cart){
            res.status(201).json(cart);
        }
        else{
            res.status(404).json({message:"Not Found"});
        }
    } catch (error) {
        next(error)
    }
}

export const removeProductFromCart = async (req, res, next) => {
    try {
        const {id,idProduct} = req.params
        const cart = await service.removeProductsFromCart(id,idProduct)
        if(cart){
            res.status(201).json(cart);
        }
        else{
            res.status(404).json({message:"Not Found"});
        }
    } catch (error) {
        next(error)
    }
}

export const updateCartItems = async (req, res, next) =>{
    try {
        const {id} = req.params
        const {items} = req.body
        const cart = await service.updateCartItems(id,items)
        if(cart){
            res.status(201).json(cart);
        }
        else{
            res.status(404).json({message:"Not Found"});
        }
    } catch (error) {
        next(error)        
    }
}

export const updateProductQuantity = async (req, res, next) =>{
    try {
        const {id,productId} = req.params
        const {quantity} = req.body
        const cart = await service.updateCartQuantity(id,productId,Number(quantity))
        if(cart){
            res.status(201).json(cart);
        }
        else{
            res.status(404).json({message:"Not Found"});
        }
    } catch (error) {
        next(error)
    }
}
export const removeProducts = async (req, res, next) => {
    try {
        const {id} = req.params
        const cart = await service.removeProducts(id)
        if(cart){
            res.status(201).json(cart);
        }
        else{
            res.status(404).json({message:"Not Found"});
        }
    } catch (error) {
        next(error)
    }
}


