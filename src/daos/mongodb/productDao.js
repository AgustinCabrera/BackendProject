import fs from 'fs';
import { ProductModel } from './models/productModel';

export const addProduct = async(product) =>{
        try {
            const productsFile = await ProductModel.getProducts();
            if (!product.title || !product.description || !product.code || product.price == 0 || product.stock < 0 || !product.category) {
                return 'Error: missing parameters';
            } else {
                const exists = await ProductModel.checkCode(product.code) // #checkCode
                if (exists === false) {
                    const newProduct = {
                        ...product,
                        id: await ProductModel.getMaxID() + 1 // #getMaxID
                    }
                    productsFile.push(newProduct);
                    await fs.promises.writeFile(ProductModel.path, JSON.stringify(productsFile));
                    return newProduct;
                } else {
                    return 'Error: Code exists'
                }
            }
            }
            catch (error){
                console.log(error);
            }
        }
        
export const getProducts = async() => {
        try {
            if(fs.existsSync(ProductModel.path)){ // verificar que existe el archivo
                const products = await fs.promises.readFile(ProductModel.path, 'utf-8');
                const productsJs = JSON.parse(products);
                return productsJs;
            } else {
                return [] // si no existe, simula un array vacío
            }
        }
        catch (error){
            console.log(error);
        }
    }
        
    /* ----------- verifica si el codigo existe ---------- */
/* async #checkCode(codeProduct){
        try {
            const productsFile = await this.getProducts();
            if (!productsFile.find(product => product.code === codeProduct)) {
                const exists = false
                return exists
            } else {
                const exists = true
                return exists
            }    
            }
        catch (error){
            console.log(error);
        }
    } */
    
    /* ------------------------ busca el ultimo ID creado ----------------------- */
  /*   async #getMaxID(){
        try {
            const productsFile = await this.getProducts();
            const ids = productsFile.map(product => product.id)
            if (ids.includes(1)) {
                return Math.max(...ids)
            } else {
                return 0
            }
        }
        catch (error){
            console.log(error);
        } 
    } */
export const getProductById = async(productId) => {
        try {
            const productsFile = await ProductModel.getProducts();
            const idProduct = productsFile.find(product => product.id === productId)
            if (idProduct) {
                return idProduct
            } else {
                return 'Error';
            }
        }
        catch (error){
            console.log(error);
        }
    }
    
    export const updateProduct = async(prodId, product) =>{
        try {
            if(Object.keys(product).length === 0) {
                return 'Nothing to update'
            } else {
                const productsFile = await ProductModel.getProducts();
                const idPosition = productsFile.findIndex(product => product.id === prodId);
                if(idPosition > -1){
                    if(product.title){productsFile[idPosition].title = product.title};
                    if(product.description){productsFile[idPosition].description = product.description};
                    if(product.code){
                        if(await ProductModel.checkCode(product.code)) { // #checkCode
                            return 'Error: code already in use';
                        } else {
                            productsFile[idPosition].code = product.code
                        };
                    };
                    if(product.price > 0){productsFile[idPosition].price = product.price} else {return 'Error: price must be greater than 0';};
                    if(product.status){productsFile[idPosition].status = product.status};
                    if(product.stock >=0){productsFile[idPosition].stock = product.stock};
                    if(product.category){productsFile[idPosition].category = product.category};
                    if(product.thumbnails){productsFile[idPosition].thumbnails = product.thumbnails};
                    
                    await fs.promises.writeFile(ProductModel.path, JSON.stringify(productsFile));
                    return productsFile[idPosition];
                } else {
                    return 'Error: product ID not found';
                }
            }
        }
        catch (error){
            console.log(error);
        }
    }
  export const deleteProduct = async(productId) =>{
        try {
            const productsFile = await ProductModel.getProducts();
            const idPosition = productsFile.findIndex(product => product.id === productId);
            if(idPosition>-1){
                productsFile.splice(idPosition,1);
                await fs.promises.writeFile(ProductModel.path, JSON.stringify(productsFile));
                return 'OK';
            } else {
                return 'Error';
            }
        }
        catch (error){
            console.log(error);
        }
    }
    export const listTopN = async(listNumber) =>{
        try {
            const productsFile = await ProductModel.getProducts();
            const slicedArray = productsFile.slice(0, listNumber);
            return slicedArray;
        }
        catch (error){
            console.log(error);
        }
    }   