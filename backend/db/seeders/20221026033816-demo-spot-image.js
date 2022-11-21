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
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-717134404264905813/original/dfe9fd1e-a010-43c9-b546-0bbc7d59f7f3.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://blogs-images.forbes.com/games/files/2017/04/Wuhu-Town.jpeg",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-715759276214360126/original/875ea373-9fa5-4632-9228-0bb8aa3efa88.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-740634701378172939/original/8ef7a4b0-79b0-439c-9da0-4a170ad4090d.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/5bd69eb7-e4ae-4615-97b7-440f1658683c.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-729597790487190657/original/07c2691a-7a40-4740-bf9b-6e821b52547b.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-740634701378172939/original/8ef7a4b0-79b0-439c-9da0-4a170ad4090d.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-698631931253224288/original/232c595b-941a-4118-a229-87fe77570993.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-715848248732958341/original/4402ef01-5bb8-49c4-89b3-3652761d7a6d.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-43425222/original/f3dfdfad-00e0-4b81-93bf-50cc2167dd9a.png?im_w=720",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-715990626223541790/original/694ee517-4dd7-4ace-92d6-c96ec635bdf0.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-728091517814307485/original/c50089d5-c449-439a-8f19-46e959bf883a.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-714635079698390598/original/3e4bd61e-3ce3-4b19-8089-1492f3443c12.jpeg?im_w=720",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-700029576007934799/original/58d4be6d-35d7-470b-8a01-d133b4f2ce7a.jpeg?im_w=720",
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
