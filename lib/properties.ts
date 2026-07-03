export type Room = {
  name: string;
  size: string;
  occupancy: string;
  description: string;
  image: string;
};

export type Facility = {
  name: string;
  hours?: string;
  image: string;
};

export type Property = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  heroImage: string;
  cardImage: string;
  intro: string;
  phone: string;
  email: string;
  mapsUrl: string;
  gallery: string[];
  diningGallery: string[];
  eventsGallery: string[];
  rooms: Room[];
  dining: {
    name: string;
    description: string;
    image: string;
  };
  facilities: Facility[];
};

const diwate = (n: number) => `/images/diwate/diwate-${String(n).padStart(2, "0")}.jpg`;
const revin = (n: number) => `/images/revinerr/reviniere-${String(n).padStart(2, "0")}.jpg`;

export const properties: Property[] = [
  {
    slug: "diwatel-grande-resort",
    name: "Diwatel Grande Resort",
    tagline: "A Refined Blend of Business and Hill Station Luxury",
    location: "Lonavala, Maharashtra",
    heroImage: diwate(2),
    cardImage: diwate(1),
    intro:
      "Rooted in the mist-kissed hills of Lonavala, Diwatel Grande Resort offers a welcoming blend of polished comfort and laid-back relaxation. Whether you are hosting a team offsite on our open lawns, celebrating a milestone in our banquet spaces, or simply escaping the bustle of Mumbai and Pune for a quiet weekend with family, our marble-framed rooms and rich multi-cuisine dining make every stay feel personal.",
    phone: "+91 83 8008 8765",
    email: "reservations@diwatelgranderesort.com",
    mapsUrl: "https://maps.google.com/?q=Diwatel+Grande+Resort+Lonavala",
    gallery: [
      diwate(2), diwate(6), diwate(7), diwate(8), diwate(9), diwate(11),
      diwate(12), diwate(13), diwate(14), diwate(16), diwate(17), diwate(18),
      diwate(19), diwate(20), diwate(21), diwate(23), diwate(24), diwate(26),
    ],
    diningGallery: [
      diwate(7), diwate(16), diwate(17), diwate(18),
    ],
    eventsGallery: [
      diwate(13), diwate(21), diwate(24), diwate(11),
    ],
    rooms: [
      {
        name: "Deluxe Room",
        size: "220 sq. ft.",
        occupancy: "Up to 3 guests",
        description:
          "Comfortable, wood-accented rooms featuring a queen bed, quiet workspace, and an expansive window framing our manicured gardens.",
        image: diwate(4),
      },
      {
        name: "Premium Suite",
        size: "340 sq. ft.",
        occupancy: "Up to 4 guests",
        description:
          "Featuring a separate, relaxing lounge area, king-size bed, and a spacious marble bath, these suites are curated for comfortable longer stays and memorable couple getaways.",
        image: diwate(9),
      },
      {
        name: "Grande Family Room",
        size: "400 sq. ft.",
        occupancy: "Up to 5 guests",
        description:
          "Featuring twin king-size beds and a cozy seating alcove, these rooms are thoughtfully arranged for families and close groups sharing their Lonavala experience.",
        image: diwate(14),
      },
    ],
    dining: {
      name: "The Grande Table",
      description:
        "Our warm, all-day multi-cuisine kitchen serves fresh Indian, Chinese, and Continental dishes, featuring a morning breakfast spread looking out onto the gardens and a dedicated dining space for family gatherings.",
      image: diwate(7),
    },
    facilities: [
      { name: "Banquet & Event Lawns", hours: "By appointment", image: diwate(13) },
      { name: "Multi-Cuisine Restaurant", hours: "7:00 AM – 11:00 PM", image: diwate(16) },
      { name: "Landscaped Gardens", image: diwate(11) },
      { name: "24-Hour Front Desk", hours: "Round the clock", image: diwate(6) },
    ],
  },
  {
    slug: "reviniere-resort-and-villa",
    name: "Reviniere Resort and Villa",
    tagline: "A Cozy Pool Villa Getaway in the Hills",
    location: "Lonavala, Maharashtra",
    heroImage: revin(13),
    cardImage: revin(11),
    intro:
      "Reviniere Resort and Villa is designed for those seeking the quiet privacy of a personal villa retreat. With sunlit, airy rooms, a tiled plunge pool, and warm corners to unwind, we welcome families and close circles of friends looking to escape. It is a space meant for slow mornings, campfire conversations, and making yourselves completely at home.",
    phone: "+91 98 2233 4455",
    email: "stay@revinieresortvilla.com",
    mapsUrl: "https://maps.google.com/?q=Reviniere+Resort+and+Villa+Lonavala",
    gallery: [
      revin(11),
      "/images/revinerr/revin-gallery-02.png",
      "/images/revinerr/revin-gallery-03.png",
      "/images/revinerr/revin-gallery-04.png",
      "/images/revinerr/revin-gallery-05.png",
      revin(13), revin(14), revin(15), revin(16), revin(17),
      revin(1), revin(2), revin(4), revin(5), revin(7), revin(8),
      revin(9), revin(10), revin(12), revin(18), revin(19), revin(20),
      revin(21), revin(22),
    ],
    diningGallery: [
      "/images/revinerr/revin-gallery-01.jpg",
      revin(14), revin(15), revin(16), revin(20),
    ],
    eventsGallery: [
      revin(19), revin(21), revin(12), revin(17),
    ],
    rooms: [
      {
        name: "Garden View Room",
        size: "180 sq. ft.",
        occupancy: "Up to 2 guests",
        description: "Charming, sun-drenched rooms with a queen bed opening directly onto our peaceful green courtyard.",
        image: "/images/revinerr/revin-gallery-02.png",
      },
      {
        name: "Villa Suite",
        size: "260 sq. ft.",
        occupancy: "Up to 3 guests",
        description: "Offering a quiet seating nook and a spacious bed, these rooms sit just a few steps away from the cool pool deck.",
        image: "/images/revinerr/revin-gallery-03.png",
      },
      {
        name: "Poolside Family Suite",
        size: "320 sq. ft.",
        occupancy: "Up to 5 guests",
        description: "Our most spacious family room, opening directly onto the pool deck — perfect for gathering together and enjoying lazy afternoons.",
        image: revin(2),
      },
    ],
    dining: {
      name: "Villa Kitchen & Poolside Dining",
      description:
        "Enjoy simple, home-style Indian and Continental meals served in our dining space or right by the pool. Our kitchen team is always happy to customize menus for private dinners and special family gatherings.",
      image: "/images/revinerr/revin-gallery-01.jpg",
    },
    facilities: [
      { name: "Tiled Plunge Pool", hours: "7:00 AM – 7:00 PM", image: revin(13) },
      { name: "Poolside Dining", hours: "8:00 AM – 10:30 PM", image: revin(15) },
      { name: "Private Villa Lawn", image: revin(19) },
      { name: "Bonfire & Barbecue", hours: "Evenings, on request", image: revin(21) },
    ],
  },
];

export const heroSlides = [diwate(2), revin(13), diwate(11), revin(15)];
