const { sequelize } = require("../db");
const { DataTypes } = require("sequelize");

const Manager = sequelize.define("Manager", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    salary: DataTypes.NUMBER,
    dateHired: DataTypes.DATEONLY,
})


module.exports = {
    Manager
}