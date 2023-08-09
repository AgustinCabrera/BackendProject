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