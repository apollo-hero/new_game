

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const active_log = sequelize.define("active_log",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            date: { type: DataTypes.DATE, defaultValue: new Date() },
            user_id: { type: DataTypes.INTEGER, defaultValue: 0 },
            action: { type: DataTypes.STRING, defaultValue: '' },

        }, {
        timestamps: false,
        schema: "web"
    });
    return active_log;
}

