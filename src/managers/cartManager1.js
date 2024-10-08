import fs from 'fs';

export default class CartManager {
    constructor (path) {
        this.path = path
    }

    async newCart(){
        try {
            const cartsFile = await this.getCarts();
                const newCart = {
                    id: await this.#getMaxID() + 1,
                    products: []
                }
                cartsFile.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                return newCart;
            }
            catch (error){
                console.log(error);
            }
        }
        
    async getCarts(){
        try {
            if(fs.existsSync(this.path)){ 
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                const cartsJS = JSON.parse(carts);
                return cartsJS;
            } else {
                return [] 
            }
        }
        catch (error){
            console.log(error);
        }
    }
        
    async #getMaxID(){
        try {
            const cartsFile = await this.getCarts();
            const ids = cartsFile.map(cart => cart.id)
            if (ids.includes(1)) {
                return Math.max(...ids)
            } else {
                return 0
            }
        }
        catch (error){
            console.log(error);
        } 
    }

    async getCartById(cartId){
        try {
            const cartsFile = await this.getCarts();
            const idCart = cartsFile.find(cart => cart.id === cartId)
            if (idCart) {
                return idCart.products
            } else {
                return `Error displaying cart: id ${cartId} does not exists`
            }
        }
        catch (error){
            console.log(error);
        }
    }
    async updateCart(cartId, prodId){
        try {
            const cartProd = {
                prodId,
                quantity: 1
            }
            if(!cartProd) {
                return 'Error: nothing to add';
            } else {
                const cartsFile = await this.getCarts();
                const cartIdx = cartsFile.findIndex(cart => cart.id === cartId);
                if(cartIdx > -1){
                    const prodIdx = cartsFile[cartIdx].products.findIndex(product => product.prodId === cartProd.prodId);
                    if(prodIdx > -1) {
                        cartsFile[cartIdx].products[prodIdx].quantity++;
                    } else {
                        cartsFile[cartIdx].products.push(cartProd);
                    }
                    await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                    return 'OK';
                } else {
                    return 'Error: cart ID not found';
                }
            }
        }
        catch (error){
            console.log(error);
        }
    }
    async deleteCart(cartId){
        try {
            const cartsFile = await this.getCarts();
            const idPosition = cartsFile.findIndex(cart => cart.id === cartId);
            if(idPosition>-1){
                cartsFile.splice(idPosition,1);
                await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
                return 'OK';
            } else {
                return 'Error';
            }
        }
        catch (error){
            console.log(error);
        }
    }
}
