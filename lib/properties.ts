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
    tagline: "A Premium Business & Luxurious Hotel",
    location: "Lonavala, Maharashtra",
    heroImage: diwate(2),
    cardImage: diwate(1),
    intro:
      "Set against the misted hills of Lonavala, Diwatel Grande Resort pairs the polish of a business hotel with the ease of a hillside retreat. Marble-floored interiors, banquet-ready event lawns, and a multi-cuisine kitchen make it equally suited to a board offsite or a family weekend away from Mumbai and Pune.",
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
          "Warm, wood-toned rooms with a queen bed, work desk, and picture window framing the resort lawns.",
        image: diwate(4),
      },
      {
        name: "Premium Suite",
        size: "340 sq. ft.",
        occupancy: "Up to 4 guests",
        description:
          "A separate sitting area, king bed, and marble bath make this the pick for longer stays and honeymooners.",
        image: diwate(9),
      },
      {
        name: "Grande Family Room",
        size: "400 sq. ft.",
        occupancy: "Up to 5 guests",
        description:
          "Twin king beds and a lounge nook, built for families and groups travelling together.",
        image: diwate(14),
      },
    ],
    dining: {
      name: "The Grande Table",
      description:
        "An all-day multi-cuisine restaurant serving Indian, Chinese, and Continental fare, with a breakfast buffet overlooking the garden and a private dining room for celebrations.",
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
    tagline: "A Boutique Pool Villa Escape",
    location: "Lonavala, Maharashtra",
    heroImage: revin(13),
    cardImage: revin(11),
    intro:
      "Reviniere Resort and Villa is Lonavala's answer to a private-villa getaway: sun-lit interiors, a tiled plunge pool, and rooms styled for guests who want their hill-station weekend to feel personal rather than programmed. Best suited to families, small groups, and celebrations that want the whole villa to themselves.",
    phone: "+91 98 2233 4455",
    email: "stay@revinieresortvilla.com",
    mapsUrl: "https://maps.google.com/?q=Reviniere+Resort+and+Villa+Lonavala",
    gallery: [
      revin(11), revin(13), revin(14), revin(15), revin(16), revin(17),
      revin(1), revin(2), revin(4), revin(5), revin(7), revin(8),
      revin(9), revin(10), revin(12), revin(18), revin(19), revin(20),
      revin(21), revin(22),
    ],
    diningGallery: [
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
        description: "Cosy, sunlit rooms with a queen bed and direct views onto the villa's green courtyard.",
        image: revin(1),
      },
      {
        name: "Villa Suite",
        size: "260 sq. ft.",
        occupancy: "Up to 3 guests",
        description: "A private seating corner and an oversized bed, steps from the pool deck.",
        image: revin(5),
      },
      {
        name: "Poolside Family Suite",
        size: "320 sq. ft.",
        occupancy: "Up to 5 guests",
        description: "The villa's largest room, opening directly onto the pool — built for family takeovers.",
        image: revin(2),
      },
    ],
    dining: {
      name: "Villa Kitchen & Poolside Dining",
      description:
        "Home-style Indian and Continental meals served either in the dining room or poolside, with the kitchen happy to build a custom menu for private groups and celebrations.",
      image: revin(14),
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
