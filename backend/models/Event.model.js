const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const event = sequelize.define("evnet",
        {
            title: { type: DataTypes.STRING, defaultValue: '' },
            start: {type: DataTypes.DATE},
            end: { type: DataTypes.DATE},
            color: { type: DataTypes.STRING, defaultValue: '#4e9cff'}
        }, {
        timestamps: false,
        schema: "web"
    });
    return event;
} 

