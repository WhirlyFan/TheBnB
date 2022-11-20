"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "https://www.architectureartdesigns.com/wp-content/uploads/2014/12/1357.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://www.architectureartdesigns.com/wp-content/uploads/2015/07/713.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://blogs-images.forbes.com/games/files/2017/04/Wuhu-Town.jpeg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://www.zekkeicollection.com/wp-content/uploads/Noku-Beach-House-Bali_3.jpg",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://images.dwell.com/photos/6176523132546707456/6498679590953132032/large.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://cdn.architecturendesign.net/wp-content/uploads/2014/08/Beach-House-08-2.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://mojehmen.com/wp-content/uploads/2017/12/Phukets-Futuristic-Beach-House-1024x682.jpg",
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
