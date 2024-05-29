const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

const { Op } = require('sequelize');
const { JWT_SECRET_KEY } = require("../config/server.config");

const Model = require("../models");

const users = Model.user;
const characters = Model.character;

const ResponseData = require("../utils/ResponseData");
const { jwtsign, checkPassword, encryptPassword, ResponseUserModel } = require("./AuthController");

// get user balance
const amount = async (req, res) => {
    const validResult = validationResult(req);
    if (!validResult.isEmpty) {
        return ResponseData.warning(res, validResult.array()[0].msg);
    }
    try {
        const user = req.user;
        if (user == null) {
            return ResponseData.error(res, 'Not registered token & user',);
        }

        jwt.verify(user.token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                const newToken = jwtsign({ id: user.id, email: user.email });
                user.token = newToken;
                user.save();

                return ResponseData.ok(res, 'Token expired and get new token', { token: newToken, amount: user.balance });
            }
            else {
                return ResponseData.ok(res, 'Token valid', { token, amount: user.balance });
            }
        })

    }
    catch (err) {
        console.log(err);
        return ResponseData.error(res, "", err);
    }
}

const setProfile = async (req, res) => {
    if (req.file) {
        var result = validationResult(req);
        if (!result.isEmpty()) {
            fs.unlink(path.resolve(req.file.path), (err) => { });
            return ResponseData.error(res, result.array()[0].msg);
        }

    }
    try {
        let user = await users.findByPk(req.user.Id);

        user.Name = req.body.name;
        user.Email = req.body.email;

        const players = await users.findAll();

        if (encryptPassword(req.body.currentPassword) != user.Password) {
            return ResponseData.warning(res, "Wrong password, check again");
        }

        if (players.length > 0 && ( await users.findOne({ where: { Email: req.body.email, Id: { [Op.not]:user.Id} } })) != null  ) {
            return ResponseData.warning(res, "This Email is already used. Use a Different one!");
        } else if (players.length > 0 && ( await users.findOne({ where: { Name: req.body.name, Id: { [Op.not]:user.Id} } })) != null  ) {
            return ResponseData.warning(res, "This Name is already used. Use a Different one!");
        }

        if (req.file) {
            user.avatar = req.file.path;

        }
            
        await user.save();


        const user_data = await users.findOne({
            where: { Id: req.user.Id },
            include: [characters]
        });

        ResponseData.ok(res, "Profile was changed", { user: user_data});
    } catch (error) {
        console.log(error);
        ResponseData.error(res, "Not saved", error);
    }

}

const updatePassword = async (req, res) => {
    try {
        let user = await users.findByPk(req.user.Id);

        if (!await checkPassword(req.body.old_password, user.Password)) {
            return ResponseData.warning(res, "Wrong password, check again");
        }

        user.Password = await encryptPassword(req.body.new_password);
        await user.save();


        const user_data = await users.findOne({
            where: { Id: req.user.Id },
            include: [characters]
        });

        ResponseData.ok(res, "Profile was changed", { user: user_data});
    } catch (error) {
        console.log(error);
        ResponseData.error(res, "Not saved", error);
    }
}

const leaderboards = async (req, res) => {
    const level_data = await characters.findAll({
        attributes: ['Name', 'Level', 'Class', 'Gender', 'LifetimeStats'],
        order: [
            ['Level', 'DESC'],
        ],
        include: [{
            model: users,
            attributes: ['Authority'],
            where: {
                Authority: {
                  [Op.not]: 30000
                }
              }
        }]
    })

    const hero_data = await characters.findAll({
        attributes: ['Name', 'HeroLevel', 'Class', 'Gender'],
        order: [
            ['HeroLevel', 'DESC'],
        ],
        include: [{
            model: users,
            attributes: ['Authority'],
            where: {
                Authority: {
                  [Op.not]: 30000
                }
              }
        }]
    })

    const reput_data = await characters.findAll({
        attributes: ['Name', 'Reput', 'Class', 'Gender'],
        order: [
            ['Reput', 'DESC'],
        ],
        include: [{
            model: users,
            attributes: ['Authority'],
            where: {
                Authority: {
                  [Op.not]: 30000
                }
              }
        }]
    })   
    
    const act_data = await characters.findAll({
        attributes: ['Name', 'Reput', 'Class', 'Gender','Act4Kill'],
        order: [
            ['Act4Kill', 'DESC'],
        ],
        include: [{
            model: users,
            attributes: ['Authority'],
            where: {
                Authority: {
                  [Op.not]: 30000
                }
              }
        }]
    })    

    return ResponseData.ok(res, '', { level_data: level_data, hero_data: hero_data, reput_data: reput_data, act_data:act_data });
}

module.exports = {
    amount,
    setProfile,
    leaderboards,
    updatePassword
}