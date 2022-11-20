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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          price: 543,
        },
        {
          ownerId: 1,
          address: "11111 Chesapeake Rd.",
          city: "Fullerton",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Fullerton Cabin",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          price: 234,
        },
        {
          ownerId: 2,
          address: "11111 Chesapeake Rd.",
          city: "Allendale",
          state: "NJ",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "test",
          description: "test desc",
          price: 421,
        },
        {
          ownerId: 1,
          address: "11111 Chesapeake Rd.",
          city: "Irvine",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Irvine Cabin",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          price: 150,
        },
        {
          ownerId: 2,
          address: "11111 Chesapeake Rd.",
          city: "Berkeley",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Berkeley Cabin",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          price: 1000,
        },
        {
          ownerId: 2,
          address: "11111 Chesapeake Rd.",
          city: "Brea",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Brea Cabin",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          price: 100,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spots", null, {});
  },
};
