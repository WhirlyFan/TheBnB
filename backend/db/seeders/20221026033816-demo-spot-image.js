"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/11031417-71ef-493e-a9dc-4f9bb0b843eb/ddn12c3-172d16f0-c31c-48d9-bc84-a411522c32b2.png/v1/fill/w_1280,h_854,q_80,strp/shrek_s_swamp_by_naouriredouane1998_ddn12c3-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODU0IiwicGF0aCI6IlwvZlwvMTEwMzE0MTctNzFlZi00OTNlLWE5ZGMtNGY5YmIwYjg0M2ViXC9kZG4xMmMzLTE3MmQxNmYwLWMzMWMtNDhkOS1iYzg0LWE0MTE1MjJjMzJiMi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.nWesVNP50-_LKTKrTAt1P6KZw2oKxRV750iB3XII3Kk",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://pm1.narvii.com/6768/4cdaf7766845cd6514f96967153433417cdd6f9ev2_hq.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://blogs-images.forbes.com/games/files/2017/04/Wuhu-Town.jpeg",
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
