

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const category = sequelize.define("category",
        {
            name: { type: DataTypes.STRING, defaultValue: '' },
            visibility: { type: DataTypes.INTEGER, defaultValue: 1 },

        }, {
        timestamps: false,
        schema: "web"
    });
    return category;
}

