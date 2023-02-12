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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
          name: "Cozy Allendale Cabin",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 100,
        },
        {
          ownerId: 3,
          address: "11111 Chesapeake Rd.",
          city: "Cedar City",
          state: "UT",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Cedar Cabin",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 145,
        },
        {
          ownerId: 3,
          address: "11111 Chesapeake Rd.",
          city: "Gatlinburg",
          state: "TN",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Gatlinburg Cabin",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 221,
        },
        {
          ownerId: 3,
          address: "11111 Chesapeake Rd.",
          city: "Tuscon",
          state: "AZ",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Tuscon Cabin",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 368,
        },
        {
          ownerId: 3,
          address: "11111 Chesapeake Rd.",
          city: "Hamden",
          state: "NY",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Hamden Cabin",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 285,
        },
        {
          ownerId: 1,
          address: "11111 Chesapeake Rd.",
          city: "Malibu",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Malibu Cabin",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 350,
        },
        {
          ownerId: 1,
          address: "11111 Chesapeake Rd.",
          city: "Joshua Tree",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Joshua Tree Cabin",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 250,
        },
        {
          ownerId: 1,
          address: "11111 Chesapeake Rd.",
          city: "Chelan",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Chelan Cabin",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 220,
        },
        {
          ownerId: 1,
          address: "11111 Chesapeake Rd.",
          city: "Sedona",
          state: "AZ",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Cozy Sedona Cabin",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 626,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spots", null, {});
  },
};
