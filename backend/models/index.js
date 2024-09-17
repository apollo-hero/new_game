const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.model.js")(sequelize, Sequelize);
db.character = require("./Character.model.js")(sequelize, Sequelize);

db.character.belongsTo(db.user, {foreignKey: 'AccountId'});

db.user.hasMany(db.character, {foreignKey: 'AccountId'});

db.control = require("./Control.model.js")(sequelize, Sequelize);

db.donate_log = require("./Donate.model.js")(sequelize, Sequelize);

db.shop_log = require("./ShopLog.model.js")(sequelize, Sequelize);

db.wheel_log = require("./WheelLog.model.js")(sequelize, Sequelize);

db.active_log = require("./ActiveLog.model.js")(sequelize, Sequelize);

db.user.hasMany(db.donate_log, {foreignKey: 'user_id'});

db.user.hasMany(db.shop_log, {foreignKey: 'user_id'});

db.user.hasMany(db.wheel_log, {foreignKey: 'user_id'});

db.user.hasMany(db.active_log, {foreignKey: 'user_id'});

db.donate_log.belongsTo(db.user, {foreignKey: 'user_id'});

db.shop_log.belongsTo(db.user, {foreignKey: 'user_id'});

db.wheel_log.belongsTo(db.user, {foreignKey: 'user_id'});

db.active_log.belongsTo(db.user, {foreignKey: 'user_id'});

db.coin = require("./Coin.model.js")(sequelize, Sequelize);

db.category = require("./Category.model.js")(sequelize, Sequelize);

db.shop_item = require("./ShopItem.model.js")(sequelize, Sequelize);

db.shop_item.belongsTo(db.category, {foreignKey: 'categoryId'});

db.category.hasMany(db.shop_item, {foreignKey: 'categoryId'});

db.mail = require("./Mail.model.js")(sequelize, Sequelize);

db.wheel_item = require("./WheelItem.model.js")(sequelize, Sequelize);

db.link = require("./Link.model.js")(sequelize, Sequelize);

db.payment_web = require('./PaymentWeb.model.js')(sequelize, Sequelize);

db.payment_web.belongsTo(db.user, {foreignKey: 'PayerID'});

db.change_log = require('./ChangeLog.model.js')(sequelize, Sequelize);

//db.event = require('./Event.model.js')(sequelize, Sequelize);

module.exports = db;