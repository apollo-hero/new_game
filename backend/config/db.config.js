module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "star123456",
    DB: "game",
    dialect: "postgres",
    pool: {
      max: 1,
      min: 1,
      acquire: 30000,
      idle: 10000
    }
  };