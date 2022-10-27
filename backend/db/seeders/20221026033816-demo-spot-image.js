"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "www.stinkerplace.com",
          preview: true,
        },
        {
          spotId: 2,
          url: "www.eahown.com",
          preview: true,
        },
        {
          spotId: 2,
          url: "www.awfaowng.com",
          preview: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SpotImages", null, {});
  },
};
