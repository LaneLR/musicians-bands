const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const testBand = await Band.create({name: 'XYZ', genre:'Rock'})
        expect(testBand.name).toBe('XYZ')
        expect(testBand.genre).toBe('Rock')
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create({name: 'Joe', instrument: 'Banjo'})
        expect(testMusician.name).toBe('Joe')
        expect(testMusician.instrument).toBe('Banjo')
    })

    test('can update a Band', async () => {
        const testBand2 = await Band.create({name: 'BMTH', genre:'Metalcore'})
        await testBand2.update({genre: "Metal"})
        expect(testBand2.genre).toEqual('Metal');
    })

    test('can update a Musician', async () => {
        const testMusician2 = await Musician.create({name: 'Michael', instrument: 'Guitar'})
        await testMusician2.update({name: "Mike"})
        expect(testMusician2.name).toBe('Mike');
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        const testBand = await Band.create({
            name: "XYZ",
            genre: "Rock"
        })
        const deletedBand = await testBand.destroy();
        expect(deletedBand).toEqual(expect.objectContaining({
            name: "XYZ",
            genre: "Rock"
        }));
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const testMusician = await Musician.create({
            name: "John",
            instrument: "Drums"
        })
        const destroyedMusician = await testMusician.destroy();
        expect(destroyedMusician).toEqual(expect.objectContaining({
            name: "John",
            instrument: "Drums"
        }));
    })
})