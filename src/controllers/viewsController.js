export const register = (req,res) =>{
    res.render('register')
}

export const errorRegister = (req,res) =>{
    res.render('errorRegister')
}

export const login= (req,res) =>{
    res.render('login',{
        title: "login"
    })
}

export const errorLogin = (req,res) =>{
    res.render('errorLogin')
}

export const products = (req,res) =>{
    res.render('products')
}