"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "145 Maplewood Ln",
          city: "Joshua Tree",
          state: "CA",
          country: "USA",
          lat: 33.69829373902616,
          lng: -116.26505036779902,
          name: "Invisible House Joshua Tree | Modern Masterpiece",
          description:
            "Experience Invisible House, a 5,500 sq. ft. minimalist retreat on 90 acres next to Joshua Tree National Park. Enjoy a 100-ft indoor pool and deluxe amenities. Managed by Fieldtrip with 24/7 support, perfect for private groups, events, and filming.",
          price: 3626,
        },
        {
          ownerId: 1,
          address: "2300 Sunset Blvd",
          city: "Boulder",
          state: "UT",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Bedrock Homestead Full Cave",
          description:
            "Bedrock Homestead Full Cave: Unwind in a unique Airbnb nestled in ancient rock formations. Enjoy a queen bed, kitchenette, and private bath. Secluded and modern, perfect for adventurers seeking unforgettable getaways.",
          price: 950,
        },
        {
          ownerId: 2,
          address: "620 Willow St",
          city: "Malibu",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "EAGLE'S WATCH MALIBU- Architectural w/ Ocean View",
          description:
            "Stunning Malibu house, Eagle's Watch by Harry Gesner, offers panoramic views, indoor/outdoor spaces, and luxury modern accommodations. Near beaches, hiking, restaurants. Hosts provide local tips, assistance. License: STR21-0116.",
          price: 1600,
        },
        {
          ownerId: 1,
          address: "1155 Oak Grove Ave",
          city: "Bend",
          state: "OR",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Dome Sweet Dome: An OMG! Experience",
          description:
            "Geodesic Dome in First-on-the-Hill has easy access to Phil's Trail & Deschutes River Trail. Walk to Old Mill & Downtown. Not suitable for pets/young children. The cabin-style setting has updated amenities & no blackout curtains.",
          price: 144,
        },
        {
          ownerId: 2,
          address: "330 Meadowview Rd",
          city: "Cedar City",
          state: "UT",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Hobbit Cottage",
          description:
            "Hobbit Cottage near Bryce Canyon, Brian Head, Zion Nat'l Park, Kannarraville Falls. Queen bed, kitchenette, shower, eco-friendly toilet. Book with Prancing Pony Inn. BBQ grill, yard games, garden in personal residence on-site.",
          price: 89,
        },
        {
          ownerId: 2,
          address: "450 Ridgeview Dr",
          city: "Cortez",
          state: "CO",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Private Sage Canyon Cliff House near Mesa Verde.",
          description:
            "Cliff House in McElmo Canyon near Mesa Verde. Red rock cliff wall alcove with amenities, internet, nearby petroglyphs, and sweeping canyon views. Native species garden and comfortable porch seating. No TV, but fast internet and Apple HomePod.",
          price: 290,
        },
        {
          ownerId: 3,
          address: "1870 Highland Ave",
          city: "Peshastin",
          state: "WA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "* Hansel Creek Gust Tree House * On 150 Acres",
          description:
            "Unique tree house on Hansel Creek. Rustic comfort w/ king bed & heat, sofa for 3rd guest. Shared bath w/ indoor shower. Hike, bike, & gold pan on 150 acres of private property. Enjoy serene beauty on the deck or by the fire pit.",
          price: 145,
        },
        {
          ownerId: 3,
          address: "905 Cedar St",
          city: "Hancock",
          state: "NY",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "The Catskill A-Frame - Mid-Century Modern Cabin",
          description:
            "Tranquil Catskill Mtn 1964 A-Frame cabin. Lake views, forest, stream, and fully equipped open-concept interior. Features retro fireplace, in-suite laundry, wifi, and dog-friendly policy ",
          price: 400,
        },
        {
          ownerId: 3,
          address: "25 Elmwood Ct",
          city: "Gatlinburg",
          state: "TN",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Mountain Getaway Cabin",
          description:
            "Escape to the Great Smoky Mountains with family and friends at our new Diamond in the Bluff cabin. Enjoy breathtaking mountain views from the wall of windows, state-of-the-art appliances, and a fully equipped kitchen.",
          price: 510,
        },
        {
          ownerId: 3,
          address: "835 Forest Hills Dr",
          city: "Pioneertown",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Sol to Soul named by Condé Nast: Coolest In Cali",
          description:
            "Experience the otherworldly at Sol to Soul, a 10-acre sanctuary in a mystical boulder theater. Reconnect with awe, star-gaze, soak in a saltwater hot tub, and leave more spellbound by life. Distinguished by Condé Nast Traveler Dec 2021.",
          price: 654,
        },
        {
          ownerId: 1,
          address: "55 Birchwood Ln",
          city: "Malibu",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Ocean View Malibu Getaway",
          description:
            "Panoramic ocean views from this 3BR/2BA Malibu Beach House. Perfect for a romantic getaway or weekend relaxation. Close to shopping, dining, beaches, trails, and wine tasting. Don't miss the stunning sunsets over Santa Monica Bay.",
          price: 593,
        },
        {
          ownerId: 1,
          address: "960 Orchard Rd",
          city: "Santa Cruz",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Oceanview Beach Retreat",
          description:
            "Stunning oceanfront home at Pleasure Point surf spot with ocean views from every room. Enjoy hot tub, sauna, 4 e-bikes, surfboards, paddle boards, kayak, games & ping pong robot.",
          price: 645,
        },
        {
          ownerId: 1,
          address: "133 Spring St",
          city: "Ennis",
          state: "MT",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "White Heart Lodge of Ennis MT",
          description:
            "Montana lodge with private river access for fly-fishing, stunning views, and easy access to Yellowstone. Well-equipped kitchen, complementary coffee, baked goods, BBQ grill, fireplace, and king/queen/sofa beds. Just outside Ennis.",
          price: 160,
        },
        {
          ownerId: 1,
          address: "315 Pinecrest Ave",
          city: "San Diego",
          state: "CA",
          country: "USA",
          lat: 323.69829373902616,
          lng: -16.26505036779902,
          name: "Ocean Front Villa #6 Two Bedrooms",
          description: "Oceanfront 2BR/1BA villa, no beach access, non-smoking property. 5-star review required. No dogs allowed. No AC, but enjoy the ocean breeze & fans. Sand beach 1 mile away at Ocean Beach Pier.",
          price: 298,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Spots", null, {});
  },
};
