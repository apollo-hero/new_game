

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const shop_item = sequelize.define("shop_item",
        {
            vnum: { type: DataTypes.INTEGER, defaultValue: 0 },
            price: { type: DataTypes.INTEGER, defaultValue: 0 },
            amount: { type: DataTypes.INTEGER, defaultValue: 0 },
            categoryId: { type: DataTypes.INTEGER, defaultValue: 0 },
            upgrade: { type: DataTypes.STRING,defaultValue: ''},
            n_number: { type: DataTypes.INTEGER}

        }, {
        timestamps: false,
        schema: "web"
    });
    return shop_item;
}

