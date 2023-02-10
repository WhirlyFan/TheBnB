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
        {
          spotId: 1,
          userId: 1,
          startDate: new Date("2022-12-01"),
          endDate: new Date("2022-12-02"),
        },
        {
          spotId: 5,
          userId: 1,
          startDate: new Date("2022-12-03"),
          endDate: new Date("2022-12-04"),
        },
        {
          spotId: 8,
          userId: 1,
          startDate: new Date("2022-12-05"),
          endDate: new Date("2022-12-06"),
        },
        {
          spotId: 10,
          userId: 1,
          startDate: new Date("2022-12-07"),
          endDate: new Date("2022-12-08"),
        },
        {
          spotId: 11,
          userId: 1,
          startDate: new Date("2022-12-09"),
          endDate: new Date("2022-12-10"),
        },
        {
          spotId: 12,
          userId: 1,
          startDate: new Date("2022-12-11"),
          endDate: new Date("2022-12-12"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookings", null, {});
  },
};
