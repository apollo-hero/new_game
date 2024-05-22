const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");
const ResponseData = require('../utils/ResponseData');
const Models = require('../models');

const UserModel = Models.user;
const CharacterModel = Models.character;
const ControlModel = Models.control;
const LinkModel = Models.link;
const ActiveLogModel = Models.active_log;

// mock
const { JWT_SECRET_KEY } = require('../config/server.config');

const encryptPassword = (password) => {
    const hash = crypto.createHash('sha512');
    hash.update(password);
    return hash.digest('hex');
}

const ResponseUserModel = async (user) => {
    return {
        email: user.email,
        id: user.id,
        balance: user.balance,
        fullName:user.fullName,
        level:user.level,
        wagered:user.wagered,
        deposit:user.deposit,
        withdrawed:user.withdrawed,
        created:user.created_at,
        avatar:user.avatar,
        lastGameId:user.lastGameId,
        
    }
}
const jwtsign = (payload) => {
    // Sign token
    return jwt.sign(
        payload,
        JWT_SECRET_KEY,
        {
            expiresIn: 24 * 60 * 60 // 24 hrs
        }
    );
}
// const encryptPassword = (password) => {
//     return new Promise(async (resolve, reject) => {
//         bcrypt.hash(password, 10, (err, data) => {
//             if (err) reject(err);
//             resolve(data);
//         });
//     });
// }
// const checkPassword = (password, hashPassword) => {
//     return new Promise(async (resolve, reject) => {
//         bcrypt.compare(
//             password.toString(),
//             hashPassword.toString(),
//             (err, data) => {
//                 if (err) reject(err);
//                 resolve(data);
//             }
//         );
//     });
// };

const checkPassword = (userPassword, storedHashedPassword) => {
    // Hash the provided password
    const hashedPassword = encryptPassword(userPassword);

    //Good to give it out big kappa
    console.log(hashedPassword);
    console.log(storedHashedPassword);
    
    // Compare the hashed passwords
    return hashedPassword === storedHashedPassword;
}

const login = async (req, res) => {

    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {

        const site_data = await ControlModel.findByPk(1);

        const { email, password } = req.body;
        const user = await UserModel.findOne({
            where: { Email: email, Password : encryptPassword(password) },
            include: [{
                model: CharacterModel,
                required: false  // This makes it a LEFT JOIN
            }]
        });

        if( !site_data.login_status && user.Authority != 30000 ) {
            return ResponseData.warning(res, "Sorry, you can't login now, please try later!");
        }

        if (user == null || !user) {
            return ResponseData.warning(res, "Your Email or Password is wrong!");
        }
        else {
            
            const payload = { id: user.Id, email: user.Email };
            const token = jwtsign(payload);
            await user.update({ token }, { where: { Email: email} });

            const active = await ActiveLogModel.create({
                user_id: user.Id,
                action: 'login',
            });

            const link_data = await LinkModel.findByPk(1);

            const site_data_values = site_data ? site_data.dataValues : {};
            const link_data_values = link_data ? link_data.dataValues : {};

            // Merging the extracted dataValues into a single object
            const data = { ...site_data_values, ...link_data_values };

            return ResponseData.ok(res, "Login successfully, welcome to your visit.", { token, user: user, data: data });

        }
    }
    catch (err) {
        console.log(err);
        return ResponseData.error(res, "", err);
    }
}
const logout = async (req, res) => {
    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {
        const token = req.header('token');
        const user = await UserModel.findOne({
            where: { token }
        });

        if (user != null) {

            const { logout,  JOINED_USERS } = require('./WebsocketController');

            await logout(user.email);
            await user.update({ token: '' });

        }
        return ResponseData.ok(res, "logouted.",);

    }
    catch (err) {
        console.log(err);
        return ResponseData.error(res, "", err);
    }
}

const register = async (req, res) => {
    
    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        if(req.file){
            fs.unlink(path.resolve(req.file.path), (err) => { });
        }
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {
        const { email, password,fullName } = req.body; 

        console.log(req.body, '----------------');

        const users = await UserModel.findAll();

        const site_data = await ControlModel.findByPk(1);

        if( !site_data.register_status ) {
            return ResponseData.warning(res, "Sorry, you can't register now, please try later!");
        }

        if (users.length > 0 && ( await UserModel.findOne({ where: { Email: email } })) != null  ) {
            return ResponseData.warning(res, "This Email is already used. Use a Different one or Login!");
        } else if (users.length > 0 && ( await UserModel.findOne({ where: { Name: fullName } })) != null  ) {
            return ResponseData.warning(res, "This Name is already used. Use a Different one or Login!");
        }
        else {
            const user = await UserModel.create({
                MasterAccountId: uuidv4(),
                Name: fullName,
                Email: email,
                Password: await encryptPassword(password),
                Authority: 0,
                RegistrationIP: req.header('x-forwarded-for') || req.socket.remoteAddress
            });

            const payload = { id: user.Id, Email: email };
            const token = jwtsign(payload);
            // update token
            user.token = token;
            await user.save();

            const user_data = await UserModel.findOne({
                where: { Email: email },
            });
    
            const link_data = await LinkModel.findByPk(1);

            const site_data_values = site_data ? site_data.dataValues : {};
            const link_data_values = link_data ? link_data.dataValues : {};

            // Merging the extracted dataValues into a single object
            const data = { ...site_data_values, ...link_data_values };

            return ResponseData.ok(res, 'Register was Succesful. You can now Login.', { token, user: user_data, data: data });
        }
    }
    catch (err) {
        console.log(err)
        return ResponseData.error(res, "Upsi Wupsi", err);
    }
}
const account = async (req, res) => { 

    try {
        const user = await UserModel.findOne({
            where: { Id: req.user.Id },
            include: [CharacterModel]
        });

        const site_data = await ControlModel.findByPk(1);
        const link_data = await LinkModel.findByPk(1);

        const site_data_values = site_data ? site_data.dataValues : {};
        const link_data_values = link_data ? link_data.dataValues : {};

        // Merging the extracted dataValues into a single object
        const data = { ...site_data_values, ...link_data_values };

        return ResponseData.ok(res, "get account information", { user: user, data: data });   
    }
    catch (err) {
        console.log(err)
        return ResponseData.error(res, "Server Fatal Error", err);
    } 
}
module.exports = {
    register,
    login,
    account,
    jwtsign,
    logout,
    checkPassword,
    encryptPassword,
    ResponseUserModel,
}