

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const active_log = sequelize.define("change_log",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            date: { type: DataTypes.DATE, defaultValue: new Date() },
            log_id: { type: DataTypes.STRING, defaultValue: "" },
            hot: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []},
            thumbUp: { type:DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: []}
        }, {
        timestamps: false,
        schema: "web"
    });
    return active_log;
}