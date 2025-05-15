const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
const { Manager } = require("./models/Manager");
// Define associations here

Band.hasMany(Musician);
Musician.belongsTo(Band);

Song.belongsToMany(Band, {through:"songband"})
Band.belongsToMany(Song, {through: "songband"})

Band.hasOne(Manager);
Manager.belongsTo(Band);

module.exports = {
    Band,
    Musician,
    Song,
    Manager,
};
