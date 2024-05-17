

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const wheel_item = sequelize.define("wheel_item",
        {
            vnum: { type: DataTypes.INTEGER, defaultValue: 0 },
            // price: { type: DataTypes.INTEGER, defaultValue: 0 },
            amount: { type: DataTypes.INTEGER, defaultValue: 0 },
            rare: { type: DataTypes.INTEGER, defaultValue: 0 },
            n_number: { type: DataTypes.INTEGER}

        }, {
        timestamps: false,
        schema: "web"
    });
    return wheel_item;
}

 