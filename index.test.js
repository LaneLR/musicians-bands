const { sequelize } = require("./db");
const { Band, Manager, Musician, Song } = require("./index");

describe("Band, Musician, and Song Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("can create a Band", async () => {
    // TODO - test creating a band
    const testBand = await Band.create({ name: "XYZ", genre: "Rock" });
    expect(testBand.name).toBe("XYZ");
    expect(testBand.genre).toBe("Rock");
  });

  test("can create a Musician", async () => {
    // TODO - test creating a musician
    const testMusician = await Musician.create({
      name: "Joe",
      instrument: "Banjo",
    });
    expect(testMusician.name).toBe("Joe");
    expect(testMusician.instrument).toBe("Banjo");
  });

  test("can update a Band", async () => {
    const testBand2 = await Band.create({ name: "BMTH", genre: "Metalcore" });
    await testBand2.update({ genre: "Metal" });
    expect(testBand2.genre).toEqual("Metal");
  });

  test("can update a Musician", async () => {
    const testMusician2 = await Musician.create({
      name: "Michael",
      instrument: "Guitar",
    });
    await testMusician2.update({ name: "Mike" });
    expect(testMusician2.name).toBe("Mike");
  });

  test("can delete a Band", async () => {
    // TODO - test deleting a band
    const testBand = await Band.create({
      name: "XYZ",
      genre: "Rock",
    });
    const deletedBand = await testBand.destroy();
    expect(deletedBand).toEqual(
      expect.objectContaining({
        name: "XYZ",
        genre: "Rock",
      })
    );
  });

  test("can delete a Musician", async () => {
    // TODO - test deleting a musician
    const testMusician = await Musician.create({
      name: "John",
      instrument: "Drums",
    });
    const destroyedMusician = await testMusician.destroy();
    expect(destroyedMusician).toEqual(
      expect.objectContaining({
        name: "John",
        instrument: "Drums",
      })
    );
  });

  test("each Band has Musician", async () => {
    const testMusician = await Musician.create({
      name: "John",
      instrument: "Drums",
    });
    const testMusician2 = await Musician.create({
      name: "Rob",
      instrument: "Vocals",
    });

    const Korn = await Band.create({name: "Korn", genre: "Pop"});
    const Poppy = await Band.create({name: "Poppy", genre: "HipHop"});

    // const allBands = await Band.findAll();
    // const allMusicians = await Musician.findAll();
    
    //left table, setter, right table value
    await Korn.setMusicians(testMusician)
    //comboName, left table, getter
    let kornMusician = await Korn.getMusicians()

    expect(kornMusician[0].name).toEqual("John");
  });

  test("many bands have many songs AND a song can have many bands", async () => {
    const Korn = await Band.create({name: "Korn", genre: "Pop"});
    const Poppy = await Band.create({name: "Poppy", genre: "HipHop"});
    const song1 = await Song.create({title: 'Hello'})
    const song2 = await Song.create({title: 'Farewell'})

    await Korn.addSongs([song1, song2])

    const foundSongs = await Korn.getSongs()
    expect(foundSongs.length).toBe(2)

    await song2.addBand(Poppy)
    const foundBands = await song2.getBands();
    expect(foundBands.map(band => band.name)).toContain('Poppy')
  })

  test("Testing one-to-one association between Manager and Band", async () => {
    const testBand = await Band.create({
      name: "Test Band",
      instrument: "Drums",
    });
    const testManager = await Manager.create({
      name: "Rob",
      email: "Rob@gmail.com",
      salary: 1000000,
      dateHired: "5/15/2025"
    });
    const testManager2 = await Manager.create({
      name: "Bob",
      email: "Bob@gmail.com",
      salary: 2000000,
      dateHired: "4/15/2025"
    });
    // set first manager
    await testBand.setManager(testManager);
    let testBandManager = await testBand.getManager();
    expect(testBandManager.name).toEqual("Rob");

    //set second new manager
    await testBand.setManager(testManager2);
    testBandManager = await testBand.getManager();
    expect(testBandManager.name).toEqual("Bob");

    //check if first manager is no longer associated to band
    const oldManager = await Manager.findByPk(1);
    expect(oldManager.bandId).toBeNull()

  })
});
