const path = require('path');
const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    stoarge: path.join(__dirname, ".dbsqlite"),
})

module.exports = {
    sequelize,
    Model,
    Sequelize
};
