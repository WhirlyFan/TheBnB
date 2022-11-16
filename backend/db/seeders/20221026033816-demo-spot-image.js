"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "https://purepng.com/public/uploads/large/purepng.com-big-househousebuildinghomewood-houseconcrete-house-1701528487110fbg0f.png",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://pm1.narvii.com/6768/4cdaf7766845cd6514f96967153433417cdd6f9ev2_hq.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://blogs-images.forbes.com/games/files/2017/04/Wuhu-Town.jpeg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://i.ytimg.com/vi/dX_g9D6uBu0/maxresdefault.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://i.ytimg.com/vi/dX_g9D6uBu0/maxresdefault.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://i.ytimg.com/vi/dX_g9D6uBu0/maxresdefault.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://i.ytimg.com/vi/dX_g9D6uBu0/maxresdefault.jpg",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SpotImages", null, {});
  },
};
