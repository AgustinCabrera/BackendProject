import { createCart } from "../managers/cart.manager"
import { saveProductToCart } from "../managers/cart.manager"

router.post('/', async (req,res)=>{
  const cart = await createCart();
  res.json(cart);

})

router.post('/:idCart/product/:idProduct', async (req,res)=>{
  const { idCart, idProduct } = req.params;
  const cart = await saveProductToCart(idCart, idProduct);
  res.json(cart);

})