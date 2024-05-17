

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const shop_log = sequelize.define("shop_log",
        {
            date: { type: DataTypes.DATE, defaultValue: new Date() },
            user_id: { type: DataTypes.INTEGER, defaultValue: 0 },
            description: { type: DataTypes.STRING, defaultValue: '' },

        }, {
        timestamps: false,
        schema: "web"
    });
    return shop_log;
}

