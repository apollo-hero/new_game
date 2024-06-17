

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const mail = sequelize.define("characters_mail", // look
        {
            Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            Date: { type: DataTypes.DATE, defaultValue: new Date() },
            SenderName: { type: DataTypes.STRING, defaultValue: "Nosmall" },
            ReceiverId: { type: DataTypes.INTEGER, defaultValue: 0 },
            MailGiftType: { type: DataTypes.INTEGER, defaultValue: 0 },
            ItemInstance: { type: DataTypes.JSONB, defaultValue: ''},
            
            CreatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
            UpdatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
            DeletedAt: { type: DataTypes.DATE },

        }, {
        timestamps: false,
        schema: "mails"
    });
    return mail;
} 

