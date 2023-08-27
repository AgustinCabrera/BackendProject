    import UserDao from "../daos/mongodb/userDao.js"

    const userDao = new UserDao();

    export const registerUser = async (user) => {
    try {
        const newUser = await userDao.register(user);
        return newUser;
    } catch (error) {
        console.log(error);
    }
    };

    export const loginUser = async (user) => {
    try {
        const userExist = await userDao.login(user);
        return userExist;
    } catch (error) {
        console.log(error);
    }
    };

    export const getById = async (id) => {
    try {
        return await userDao.getById(id);
    } catch (error) {
        console.log(error);
    }
    };