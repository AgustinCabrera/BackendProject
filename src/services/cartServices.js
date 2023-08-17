import * as cartDao from '../daos/mongodb/cartDao.js'
import ProductDaoMongoDB from '../daos/mongodb/cartDao.js'


const productDao = new ProductDaoMongoDB();

export const getAll = async() => {
    try {
    const response = await cartDao.getAll();
    return response;
    } catch (error) {
        console.log(error)
    }
}

export const create = async () => {
    try {
    const newCart = await cartDao.create();
    if(!newCart) return false;
    else return {message: "Cart saved successfully!"};
    } catch (error) {
    console.log(error);
    }
}
export const getCartById = async (id) => {
    try {
    const cartId = await cartDao.getCartById(id);
    if(!cartId) return false;
    else return cartId;
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCart = async (id, productId) => {
try {
const cart = await cartDao.getCartById(id);
const product = await productDao.getProductById(productId);

if(!product) throw new Error("Product not found");
if(!cart) throw new Error("Cart not found");

const newCart = await cartDao.addProductToCart(id,productId);
return newCart;
} catch (error) {
console.error(error);
}
}

export const updateCartItems = async (id,items) => {
try {
    const products = await productDao.getAll(id);
    const productsId = await products.map((product) => product.id.toString());
    const itemsId = await items.map((items)=> items.id.toString());
    const productsExist = itemsId.every((id) => productsId.includes(id));

    if(!productsExist) throw new Error("Product not found");

    // validacion de items
    const itemsFormat = items.every((item)=> item.product && item.quantity >=0)
    if(!itemsFormat) throw new Error("Items format not found");

    const updatedCart = await cartDao.updateCartItems(id,items)
    return updatedCart;

    } catch (error) {
        console.log(error);
    }
}

export const deleteProductFromCart = async (id,productId) => {
    try {
    const cart = await cartDao.getCartById(id);
    const product = await productDao.getProductById(productId);

    if(!product) throw new Error("Product not found");
    if(!cart) throw new Error("Cart not found");

    const updatedCart = await cartDao.deleteProductFromCart(id, product);
    return updatedCart;

    } catch (error) {
        console.log(error);
    }
}

export const updateCartQuantity = async (id,quantity) => {
    try {
        const cart = await cartDao.getCartById(id);
        const product = await productDao.getProductById(productId);
    
        if(!product) throw new Error("Product not found");
        if(!cart) throw new Error("Cart not found");

        const updatedCart = await cartDao.updateCartQuantity(id,quantity,quantity);
        return updatedCart;
    } catch (error) {
        console.error(error);
    }
}

export const removeProducts = async(id) => {
try {
    const cart = await cartDao.getCartById(id)
    if(!cart) throw new Error("Cart not found");
    const updatedCart = await cartDao.removeProducts(id)
    return updatedCart;
} catch (error) {
    console.error(error);
}
}

