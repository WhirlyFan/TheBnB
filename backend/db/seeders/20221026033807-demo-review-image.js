"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ReviewImages",
      [
        {
          reviewId: 1,
          url: "www.stinkerplace.com",
        },
        {
          reviewId: 2,
          url: "www.www.com",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ReviewImages", null, {});
  },
};
