

const DataTypes = require('sequelize').DataTypes;

module.exports = (sequelize) => {
    const user = sequelize.define("account",
        {
            Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            MasterAccountId: { type: DataTypes.UUID, defaultValue: "00000000-0000-0000-0000-000000000000"},
            Authority: { type: DataTypes.INTEGER, defaultValue: 0},
            Language: { type: DataTypes.INTEGER, defaultValue: 0},
            BankMoney: { type: DataTypes.INTEGER, defaultValue: 0},
            IsPrimaryAccount: { type: DataTypes.BOOLEAN, defaultValue: false},

            Email: { type: DataTypes.STRING, defaultValue: '' },
            Password: { type: DataTypes.STRING, defaultValue: '' },
            token: { type: DataTypes.STRING, defaultValue: '' },
            RegistrationIP: { type: DataTypes.STRING, defaultValue: '' },
            Coins: { type: DataTypes.FLOAT(10, 2), defaultValue: 0 },
            reward: { type: DataTypes.INTEGER, defaultValue: 0 },

            Name: { type: DataTypes.STRING, defaultValue: '' },
            // avatar: { type: DataTypes.STRING, defaultValue: `/assets/avatars/avatar-${Math.floor(Math.random() * 10)}.png` },
            Rare_Pity: { type: DataTypes.INTEGER, defaultValue: 0 },

            CreatedAt: { type: DataTypes.DATE, defaultValue: new Date() },
            UpdatedAt: { type: DataTypes.DATE, defaultValue: new Date() }, 
            DeletedAt: { type: DataTypes.DATE},
            VerifyEmail: {type: DataTypes.BOOLEAN, defaultValue: false},
            payment_method: {type: DataTypes.STRING, defaultValue: 'paypal'}
        }, {
        timestamps: false,
        schema: "accounts"
    });
    return user;
}

