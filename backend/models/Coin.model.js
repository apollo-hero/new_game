

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const coin = sequelize.define("coin",
        {
            Price: { type: DataTypes.INTEGER, defaultValue: 0 },
            CoinId: { type: DataTypes.INTEGER, defaultValue: 0 },
            Coins: { type: DataTypes.INTEGER, defaultValue: 0 },
            BonusCoins: { type: DataTypes.INTEGER, defaultValue: 0 },

        }, {
        timestamps: false,
        schema: "web"
    });
    return coin;
}

