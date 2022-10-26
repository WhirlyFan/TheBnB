"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "48263 Chesapeake Rd.",
          city: "Indio",
          state: "CA",
          country: "USA",
          lat: 33.69829373902616,
          lng: -116.26505036779902,
          name: "Cozy Coachella Cabin",
          description:
            "Want a quick getaway to the middle of nowhere? We have a pool.",
          price: 1.99,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spots", null, {});
  },
};
