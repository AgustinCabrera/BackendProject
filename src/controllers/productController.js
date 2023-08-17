import * as service from "../services/productServices"

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAllService()
        const limit = parseInt(req.query.limit)
        const skip = parseInt(req.query.skip)
        const page = parseInt(req.query.page)
        const ProductService = new ProductService(response);
    } catch (error) {
        next(error)
    }
}

export const getById = async (req, res, next) => {
    try {
        const {id} = req.params ;
        const prod = await service.getById(id)
        if(!prod) res.status(404).json({msg: "Product not found"})
        else res.json(prod)
    } catch (error) {
        next(error)
    }
}

export const create = async (req, res, next) => {
    try {
        const newProduct = await service.createService(req.body)
        if(!newProduct) res.status(404).json({msg: "Validation failed"})
        else res.json(newProduct)
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    try {
        const update = await service.updateService(req.body)
        if(!update) res.status(404).json({msg: "Couldn't update product"})
        else res.json(update)
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const remove = await service.deleteProductService(req.body)
        if(!remove) res.status(404).json({msg: "Couldn't remove product"})
        else res.json(remove)
    } catch (error) {
        next(error)
    }
}