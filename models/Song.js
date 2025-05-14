const { DataTypes } = require('sequelize');
const {Sequelize, sequelize, Model} = require('../db');

// TODO - define the Song model
let Song = sequelize.define("song", {
    title: DataTypes.STRING,
    year: DataTypes.NUMBER,
    length: DataTypes.NUMBER
})

module.exports = {
    Song
};