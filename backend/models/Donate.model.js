

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const donation = sequelize.define("donation",
        {
            date: { type: DataTypes.DATE, defaultValue: new Date(Date.now()) },
            user_id: { type: DataTypes.INTEGER, defaultValue: 0 },
            amount: { type: DataTypes.INTEGER, defaultValue: 0 },

        }, {
        timestamps: false,
        schema: "web"
    });
    return donation;
}

