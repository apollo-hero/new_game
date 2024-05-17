

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const wheel_log = sequelize.define("wheel_log",
        {
            date: { type: DataTypes.DATE, defaultValue: new Date() },
            user_id: { type: DataTypes.INTEGER, defaultValue: 0 },
            description: { type: DataTypes.STRING, defaultValue: '' },

        }, {
        timestamps: false,
        schema: "web"
    });
    return wheel_log;
}

