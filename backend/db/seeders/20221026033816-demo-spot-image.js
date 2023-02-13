"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "SpotImages",
      [
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/12f92460-282f-47cc-87cd-e1f5054268ef.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/801d7d54-1854-4814-951a-b6825de28ff2.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/e78f1df5-2b47-4d34-9b8f-917bdb28f581.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/3aea0121-1b89-4923-aa3e-9c18f5b53ba6.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/8aa6e704-b0e1-4d85-96ca-14c5818e3958.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/22a2c42e-108b-4809-b274-ada4f3d6da28.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/e1cedb79-ae0b-487b-b604-185d39f3e264.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/286bb767-ea7f-4c9f-9162-4b0dee4740f0.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/22a2c42e-108b-4809-b274-ada4f3d6da28.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/6e7cc096-ae8e-4307-88e7-b4ce5b1e9405.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/2e5ce6c9-4935-49ce-891e-e6f7251a8590.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/8cd65997-d77d-40f0-a41c-18ef2559d881.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-3156442/original/da7e5a4e-97b8-4ed2-86b7-3b4ebbfd3ecd.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-3156442/original/26cf4e77-988f-4616-afb9-404598b81f72.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/43016987-a5eb-47df-902d-a20960417fab.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/1e16f2f4-1256-44cb-a0f2-85aa57672a45.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/d8861dba-37c3-483b-98a4-9c199d60476b.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/32ef68c3-d815-45cb-b3c5-97f7eb38d842.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/c05ff63e-8bf1-4a4f-bb20-6782703bb79b.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/02d014d6-b33a-4060-acbf-e8c02b3a7997.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/56467892-0d23-4ab1-8302-9c3d0d5e52cd.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/e973414d-670a-495c-9c10-9c5b7c50d46c.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/6342fa90-e175-442a-abd3-79d0b2e89f10.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/de1a5925-d8f6-4f31-8008-967c0a19562a.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/79982256-5f9e-4aa7-8bab-cab61a042369.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/02a6b6df-bb89-4721-ba7f-c703d94a99d4.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/794e91e5-32f5-4605-932f-0622d65c0cda.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/802bc522-f1ee-414d-b224-d8fccf45dd87.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/9e30417a-672e-4fd2-8510-d64a5a081bc6.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/4e989c54-4927-497b-a25b-9dfd365a9d18.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/f906fe29-49de-4375-a485-a8148c5e0de0.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/fedfd719-db8e-4c1c-aef6-f89ae0703cbb.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/c7d54e7b-4ff2-4c1f-8cd4-2459f71bc819.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/08353c1f-b28d-4d3d-8a4e-f92495f1df26.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/9a292ef6-01c0-4085-a5d3-6e29dfb7a675.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/7366b73c-dfae-4155-bd95-0d0d66d222e7.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/8d9afde8-3412-4ca5-92a3-de1c8c628360.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/718dfa6a-afba-4a79-9d01-e245b8fcc2a4.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/12fb0ef4-1bcf-4067-99c0-0d11f43a1a96.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/c826ff71-84e1-4ee9-946c-5301be4b934e.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52288428/original/059cc00a-1c12-4531-a119-9eab7260d3d9.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52288428/original/343e9537-2179-4de0-8391-777cc69be012.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52288428/original/343e9537-2179-4de0-8391-777cc69be012.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52288428/original/3c7566ed-e0b1-442b-a2c3-3fc64ce1720a.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52288428/original/f98e8583-2658-47bb-b743-9938a236f850.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/141d2945-0d2c-45ae-b108-246447071fde.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39271504/original/f9d37b8e-824f-463a-b9c6-643b7e5499f7.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39271504/original/f02bdd9f-6255-4550-96f8-02270ce93f1b.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/8d6b5a68-1f5c-41b5-8065-d601267265b1.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39271504/original/9b25b3b5-8ba5-4394-a0fc-fdcad334778a.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/1a8bbb95-ff25-481c-ad91-475d1296840d.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-18506757/original/ed199105-5355-4690-a145-00d918b34b0b.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/10152f12-608f-4bb7-a526-11ad7ae61c88.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-18506757/original/9542bfa8-844e-481f-9c5e-252b8f15110f.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/beb95362-3f5a-48ae-b205-b895e2a19c48.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/ca513d07-75cb-4626-9ee2-44dafe21c1d2.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/f38c6c31-b9fa-4adb-9af5-cf83efdb667e.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/4ac39e10-eada-4d1f-95fb-70a76d350bec.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/fedf133f-8fa6-4ce9-b416-8cd447b7d1ce.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-38103188/original/37c6c735-cb62-437c-bad6-64d555f270ec.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/6370aee1-4656-4c95-830c-7e2df61f5b82.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/7921e5f0-c9da-4eb6-b1d5-9955683cbed4.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/1c8cc6ae-2881-4b16-b585-b81f3405db20.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/00c88a6b-c0a4-494f-ba89-c8f39f9bc15c.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/c2306652-d916-4f0b-990c-8a6cee24607b.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/966664eb-f916-4466-b1c1-09d191e39281.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/f051ce5a-99ba-47aa-9642-b1c7686ce92e.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/fbca40e3-5376-4040-a199-5d5d73652ca7.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/c7680ee9-12f1-4c31-9dd0-3cb28a2e3c69.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/d0a104e2-0a4b-4080-97a3-abaa81a968a1.jpg?im_w=720",
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
