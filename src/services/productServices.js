import ProductDaoMongoDB from "../daos/mongodb/productDao.js";

const productDao = new ProductDaoMongoDB();

export const getAll = async () => {
    try {
    const response = await productDao.getAll();
    return response;
    } catch (error) {
    console.error(error);
    }
}

export const getAllPaginated = async (options) => {
    try {
        const response = await productDao.getAllPaginated(options);
        const result = {
        payload: response.docs,
        status: "success",
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
        prevLink: response.prevLink
        ? `http://localhost:8080/views/products?page=${response.prevPage}`
        : null,
        nextLink: response.hasNextPage
        ? `http://localhost:8080/views/products?page=${response.nextPage}`
        : null,
        }
        return result;
    } catch (error) {
    console.log(error);
    }
}

export const getById = async (id) => {
try {
    const product = await productDao.getById(id);
    return product;
} catch (error) {
    console.error(error);
}
}

export const create = async (product) => {
    try {
        const products = await productDao.getAll();
        if(products.find((p)=> p.code === product.code)) throw new Error("Product already exists");
        const newProduct = await productDao.create(product);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

export const update = async (id,product) =>{
    try {
        const updatedProduct = await productDao.update(id,product);
        return updatedProduct;
    } catch (error) {
        console.log(error)
    }
}

export const remove = async (id) => {
try {
    const removedProduct = await productDao.delete(id);
    return removedProduct;
} catch (error) {
    console.log(error)
}

}

