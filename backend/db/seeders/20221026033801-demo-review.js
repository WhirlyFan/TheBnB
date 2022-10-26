"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          spotId: 1,
          userId: 2,
          review:
            "lil stinker of place. Could've sworn I heard somebody scurrying around at like 1am in the morning",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 3,
          review:
            "I've sworn I heard somebody scurrying around at like 1am in the morning",
          stars: 3,
        },
        {
          spotId: 2,
          userId: 3,
          review:
            "I've sworn I heard somebody scurrying around at like 1am in the morning",
          stars: 3,
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
