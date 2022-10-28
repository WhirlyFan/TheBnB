"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Bookings",
      [
        {
          spotId: 1,
          userId: 2,
          startDate: new Date("2022-10-25"),
          endDate: new Date("2022-10-31"),
        },
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("2022-11-01"),
          endDate: new Date("2022-11-05"),
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2022-11-01"),
          endDate: new Date("2022-11-05"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
