import {Router} from 'express'
const router = Router();

import * as views from "../controllers/viewsController.js"

router.get('/',views.login);
router.get('/register',views.register);
router.get('/error-login',views.errorLogin);
router.get('/error-register',views.errorRegister);
router.get('/products',views.products);

export default router;
