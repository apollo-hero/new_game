

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const link = sequelize.define("link",
        {
            discord: { type: DataTypes.STRING, defaultValue: '' },
            elite: { type: DataTypes.STRING, defaultValue: '' },
            
            ragezone: { type: DataTypes.STRING, defaultValue: '' },
            inforge: { type: DataTypes.STRING, defaultValue: '' },

            x86_download: { type: DataTypes.STRING, defaultValue: '' },
            x64_download: { type: DataTypes.STRING, defaultValue: '' },

        }, {
        timestamps: false,
        schema: "web"
    });
    return link;
}

