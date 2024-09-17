

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const control = sequelize.define("control_web",
        {
            name: { type: DataTypes.STRING, defaultValue: '' },
            domain: { type: DataTypes.STRING, defaultValue: '' },
            email: { type: DataTypes.STRING, defaultValue: '' },
            status: { type: DataTypes.BOOLEAN, defaultValue: true },
            store_status: { type: DataTypes.BOOLEAN, defaultValue: true },
            captcha_key: { type: DataTypes.STRING, defaultValue: '' },
            roulette_price: { type: DataTypes.INTEGER, defaultValue: 0 },
            coin_discount: { type: DataTypes.INTEGER, defaultValue: 0 },
            coin_bonus: { type: DataTypes.INTEGER, defaultValue: 0 },
            coin_status: { type: DataTypes.BOOLEAN, defaultValue: true },
            roulette_status: { type: DataTypes.BOOLEAN, defaultValue: true },
            register_status: { type: DataTypes.BOOLEAN, defaultValue: true },
            login_status: { type: DataTypes.BOOLEAN, defaultValue: true },
            jackpot_status: { type: DataTypes.BOOLEAN, defaultValue: true },
            paypal_email: { type: DataTypes.STRING, defaultValue: '' },
            payment_method: { type: DataTypes.STRING, defaultValue: 'paypal' },

        }, {
        timestamps: false,
        schema: "web"
    });
    return control; 
}

