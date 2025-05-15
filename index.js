const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
// Define associations here

Band.hasMany(Musician);
Musician.belongsTo(Band);

Song.belongsToMany(Band, {through:"songband"})
Band.belongsToMany(Song, {through: "songband"})

module.exports = {
    Band,
    Musician,
    Song
};
