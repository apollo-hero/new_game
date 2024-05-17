const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const payment_web = sequelize.define("payment_web",
        {
            Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            TransactionID: { type: DataTypes.STRING, defaultValue: "" },
            PayerEmail: { type: DataTypes.STRING, defaultValue: "" },
            PayerID: { type: DataTypes.INTEGER, defaultValue: 0 },
            Date: { type: DataTypes.DATE, defaultValue: new Date() },
            Method: { type: DataTypes.STRING, defaultValue: 'Paypal'},
            Description: { type: DataTypes.STRING, defaultValue: '' },
            Amount: { type: DataTypes.INTEGER, defaultValue: 0 },
            Currency: { type: DataTypes.STRING, defaultValue: ""},
            
            CreatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
            UpdatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
            DeletedAt: { type: DataTypes.DATE },

        }, {
        timestamps: false,
        schema: "web"
    });
    return payment_web;
} 

