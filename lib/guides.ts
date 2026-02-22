export interface Review {
  id: string;
  touristName: string;
  rating: number;
  comment: string;
  trekName: string;
  date: string;
}

export interface Guide {
  id: string;
  name: string;
  photo: string;
  bio: string;
  experience: number; // years
  specializations: string[];
  languages: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  pricePerDay: number; // USD
  location: string;
  availability: boolean;
  verified: boolean;
  registeredAt: string;
  reviews: Review[];
}

export interface Booking {
  id: string;
  guideId: string;
  guideName: string;
  touristName: string;
  touristEmail: string;
  touristPhone: string;
  trekName: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  message: string;
  status: "pending" | "confirmed" | "cancelled";
  totalCost: number;
  createdAt: string;
}

const GUIDES_KEY = "sherpa-ai-guides";
const BOOKINGS_KEY = "sherpa-ai-bookings";

const SEED_GUIDES: Guide[] = [
  {
    id: "guide-001",
    name: "Pemba Sherpa",
    photo: "",
    bio: "Born and raised in Namche Bazaar, I have spent my entire life in the Himalayas. With over 15 years of guiding experience, I have led more than 200 expeditions on Everest, Lhotse, and Makalu. My intimate knowledge of the terrain, weather patterns, and local culture makes every trek a transformative experience.",
    experience: 15,
    specializations: ["Everest Base Camp", "Three Passes Trek", "Island Peak"],
    languages: ["English", "Nepali", "Tibetan", "Japanese"],
    certifications: ["TAAN Certified", "Wilderness First Responder", "High Altitude Rescue"],
    rating: 4.9,
    reviewCount: 87,
    pricePerDay: 85,
    location: "Namche Bazaar, Solukhumbu",
    availability: true,
    verified: true,
    registeredAt: "2023-01-15",
    reviews: [
      {
        id: "r001",
        touristName: "Sarah Mitchell",
        rating: 5,
        comment: "Pemba is absolutely incredible. His knowledge of the mountain and ability to read weather patterns kept our group safe during an unexpected storm near Lobuche. Highly recommend!",
        trekName: "Everest Base Camp",
        date: "2024-11-12",
      },
      {
        id: "r002",
        touristName: "Hiroshi Tanaka",
        rating: 5,
        comment: "Professional, patient, and deeply knowledgeable. Pemba made our Three Passes Trek one of the best experiences of my life. His English is excellent and he explained the local culture beautifully.",
        trekName: "Three Passes Trek",
        date: "2024-10-05",
      },
      {
        id: "r003",
        touristName: "Emma Larsson",
        rating: 5,
        comment: "I had altitude sickness near Gorak Shep and Pemba handled it perfectly — calm, professional, and got me down safely. I cannot imagine doing this trek without him.",
        trekName: "Everest Base Camp",
        date: "2024-09-22",
      },
    ],
  },
  {
    id: "guide-002",
    name: "Dawa Lama",
    photo: "",
    bio: "A passionate mountaineer from Lukla who started guiding at age 18. I specialize in the Annapurna circuit and have deep connections with local teahouse owners, ensuring my clients get the best hospitality along the trail. I believe trekking is as much about cultural immersion as it is about the landscape.",
    experience: 9,
    specializations: ["Annapurna Circuit", "Poon Hill", "Annapurna Base Camp"],
    languages: ["English", "Nepali", "Hindi", "German"],
    certifications: ["TAAN Certified", "First Aid & CPR", "Nepal Tourism Board Licensed"],
    rating: 4.8,
    reviewCount: 54,
    pricePerDay: 70,
    location: "Pokhara, Gandaki",
    availability: true,
    verified: true,
    registeredAt: "2023-03-22",
    reviews: [
      {
        id: "r004",
        touristName: "Klaus Weber",
        rating: 5,
        comment: "Dawa is fantastic — speaks excellent German, knows every shortcut on the Annapurna Circuit, and his humor kept our spirits high on tough days. A true gem!",
        trekName: "Annapurna Circuit",
        date: "2024-10-18",
      },
      {
        id: "r005",
        touristName: "Priya Sharma",
        rating: 4,
        comment: "Great guide with wonderful local knowledge. The only minor issue was some delays at the start, but once on the trail he was absolutely on point. Would book again.",
        trekName: "Poon Hill",
        date: "2024-08-30",
      },
    ],
  },
  {
    id: "guide-003",
    name: "Lakpa Tamang",
    photo: "",
    bio: "I am a Tamang guide from Rasuwa district, specializing in the Langtang region which is my ancestral homeland. I survived the 2015 earthquake and helped rebuild the Langtang community. Guiding tourists through this region is my way of sharing its beauty and supporting local recovery.",
    experience: 11,
    specializations: ["Langtang Valley Trek", "Gosaikunda Trek", "Helambu Circuit"],
    languages: ["English", "Nepali", "Tamang", "French"],
    certifications: ["TAAN Certified", "Mountain First Aid", "Cultural Heritage Guide"],
    rating: 4.9,
    reviewCount: 62,
    pricePerDay: 65,
    location: "Langtang Village, Rasuwa",
    availability: false,
    verified: true,
    registeredAt: "2023-02-08",
    reviews: [
      {
        id: "r006",
        touristName: "Camille Dubois",
        rating: 5,
        comment: "Lakpa's personal connection to Langtang Valley made this trek profoundly moving. He introduced us to his family, shared stories of the earthquake, and the trail through his homeland felt sacred. Merci beaucoup!",
        trekName: "Langtang Valley Trek",
        date: "2024-11-01",
      },
      {
        id: "r007",
        touristName: "James O'Brien",
        rating: 5,
        comment: "Best guide I have ever had. Lakpa knows every rock on the Langtang trail and his knowledge of local flora and fauna is extraordinary. The tea at his cousin's place was amazing too!",
        trekName: "Gosaikunda Trek",
        date: "2024-09-14",
      },
    ],
  },
  {
    id: "guide-004",
    name: "Nima Dorje",
    photo: "",
    bio: "A young and energetic guide from Mustang who specializes in remote high-altitude treks. I completed my mountaineering training at the Himalayan Mountaineering Institute in Darjeeling and bring a technical edge to every expedition. I am passionate about sustainable trekking practices.",
    experience: 5,
    specializations: ["Upper Mustang Trek", "Manaslu Circuit", "Tsum Valley"],
    languages: ["English", "Nepali", "Mandarin"],
    certifications: ["TAAN Certified", "HMI Mountaineering Basic", "Eco-Trekking Certified"],
    rating: 4.7,
    reviewCount: 28,
    pricePerDay: 75,
    location: "Lo Manthang, Mustang",
    availability: true,
    verified: true,
    registeredAt: "2023-06-14",
    reviews: [
      {
        id: "r008",
        touristName: "Li Wei",
        rating: 5,
        comment: "Nima's Mandarin was a pleasant surprise and made communication so easy. His knowledge of Upper Mustang's Buddhist culture is exceptional. A wonderful, once-in-a-lifetime experience.",
        trekName: "Upper Mustang Trek",
        date: "2024-10-25",
      },
      {
        id: "r009",
        touristName: "Anna Kowalski",
        rating: 4,
        comment: "Very professional and safety-conscious guide. Nima pushed us just the right amount on the Manaslu circuit and made smart decisions at the high passes. Young but very capable.",
        trekName: "Manaslu Circuit",
        date: "2024-09-08",
      },
    ],
  },
  {
    id: "guide-005",
    name: "Kami Rai",
    photo: "",
    bio: "With a background in environmental science and over a decade of guiding experience, I offer a unique perspective on Nepal's mountain ecosystems. I specialize in the Everest region and lower-altitude nature treks, and I am passionate about connecting trekkers with Nepal's incredible biodiversity.",
    experience: 12,
    specializations: ["Everest Base Camp", "Gokyo Lakes Trek", "Khumbu region"],
    languages: ["English", "Nepali", "Rai", "Spanish"],
    certifications: ["TAAN Certified", "Environmental Guide License", "First Aid"],
    rating: 4.8,
    reviewCount: 71,
    pricePerDay: 80,
    location: "Solu Khumbu, Okhaldhunga",
    availability: true,
    verified: true,
    registeredAt: "2022-11-30",
    reviews: [
      {
        id: "r010",
        touristName: "Maria Gonzalez",
        rating: 5,
        comment: "Kami taught me the names of every bird and plant along the Gokyo route. His environmental perspective completely changed how I experience trekking. Absolutely incredible guide.",
        trekName: "Gokyo Lakes Trek",
        date: "2024-11-08",
      },
      {
        id: "r011",
        touristName: "David Chen",
        rating: 5,
        comment: "Top-notch professional. Kami managed our group of 8 flawlessly, was always first up and last to rest, and his knowledge of acclimatization protocols gave us total confidence.",
        trekName: "Everest Base Camp",
        date: "2024-10-12",
      },
    ],
  },
  {
    id: "guide-006",
    name: "Sanu Maya Gurung",
    photo: "",
    bio: "One of Nepal's few licensed female mountain guides, I have been breaking barriers in the trekking industry for over 8 years. I specialize in the Annapurna region and offer a warm, nurturing guiding style that many solo female travelers particularly appreciate. I am also an advocate for women's rights in rural Nepal.",
    experience: 8,
    specializations: ["Annapurna Base Camp", "Annapurna Circuit", "Poon Hill"],
    languages: ["English", "Nepali", "Gurung", "Italian"],
    certifications: ["TAAN Certified", "Women's Trekking Association Licensed", "First Aid"],
    rating: 4.9,
    reviewCount: 45,
    pricePerDay: 72,
    location: "Ghandruk, Kaski",
    availability: true,
    verified: true,
    registeredAt: "2023-04-19",
    reviews: [
      {
        id: "r012",
        touristName: "Giulia Romano",
        rating: 5,
        comment: "As a solo female traveler, having Sanu as my guide was a game-changer. She is fierce, knowledgeable, and made me feel completely safe. Her stories about Gurung traditions were fascinating.",
        trekName: "Annapurna Base Camp",
        date: "2024-11-15",
      },
      {
        id: "r013",
        touristName: "Rebecca Park",
        rating: 5,
        comment: "Sanu is a legend. She carried more than anyone in our group, navigated the trail perfectly in poor visibility, and her hospitality at every teahouse made us feel like royalty. Book her immediately!",
        trekName: "Annapurna Circuit",
        date: "2024-09-28",
      },
    ],
  },
  {
    id: "guide-007",
    name: "Tshering Bhutia",
    photo: "",
    bio: "Originally from Sikkim, I have been guiding in Nepal for 7 years and bring a cross-Himalayan perspective to every trek. My expertise lies in remote, off-the-beaten-path routes in the Dolpo and Kanchenjunga regions. I hold a Restricted Area Permit Coordinator license which allows me to take groups into Nepal's most restricted zones.",
    experience: 7,
    specializations: ["Kanchenjunga Trek", "Dolpo Trek", "Rara Lake Trek"],
    languages: ["English", "Nepali", "Sikkimese", "Hindi"],
    certifications: ["TAAN Certified", "Restricted Area Guide License", "Wilderness Medicine"],
    rating: 4.7,
    reviewCount: 33,
    pricePerDay: 90,
    location: "Kathmandu",
    availability: false,
    verified: true,
    registeredAt: "2023-05-07",
    reviews: [
      {
        id: "r014",
        touristName: "Alexander Novak",
        rating: 5,
        comment: "Tshering took us on the Dolpo trek and it was the most remote and beautiful place I have ever been. His logistics skills are exceptional — everything ran like clockwork in incredibly challenging conditions.",
        trekName: "Dolpo Trek",
        date: "2024-10-30",
      },
      {
        id: "r015",
        touristName: "Yuki Sato",
        rating: 4,
        comment: "A great guide for advanced trekkers. The Kanchenjunga route is demanding and Tshering managed it beautifully. His restricted area permits meant no hassle at checkpoints.",
        trekName: "Kanchenjunga Trek",
        date: "2024-09-19",
      },
    ],
  },
  {
    id: "guide-008",
    name: "Buddhi Man Magar",
    photo: "",
    bio: "A third-generation guide from Pokhara, I have been leading treks since I was 20. My speciality is the Dhaulagiri and Mustang regions, and I have completed multiple crossings of the challenging Dhampus Pass. I offer both group and private trek services and am known for my exceptional cooking skills — my clients never go hungry!",
    experience: 18,
    specializations: ["Dhaulagiri Circuit", "Upper Mustang Trek", "Annapurna Circuit"],
    languages: ["English", "Nepali", "Magar", "Korean"],
    certifications: ["TAAN Certified", "Senior Guide License", "Altitude Medicine Course", "Cook-Guide Certified"],
    rating: 4.8,
    reviewCount: 96,
    pricePerDay: 95,
    location: "Pokhara, Gandaki",
    availability: true,
    verified: true,
    registeredAt: "2022-09-11",
    reviews: [
      {
        id: "r016",
        touristName: "Jin-ho Park",
        rating: 5,
        comment: "Buddhi Man is the complete package — expert guide, amazing cook, and genuinely kind person. His dal bhat on the Dhaulagiri circuit was better than any restaurant in Kathmandu!",
        trekName: "Dhaulagiri Circuit",
        date: "2024-10-22",
      },
      {
        id: "r017",
        touristName: "Sophie Müller",
        rating: 5,
        comment: "18 years of experience really shows. Buddhi Man anticipated every challenge before it became a problem. One of the most capable and personable guides you could hope for.",
        trekName: "Upper Mustang Trek",
        date: "2024-11-03",
      },
    ],
  },
];

export function getGuides(): Guide[] {
  if (typeof window === "undefined") return SEED_GUIDES;
  try {
    const raw = localStorage.getItem(GUIDES_KEY);
    if (!raw) {
      localStorage.setItem(GUIDES_KEY, JSON.stringify(SEED_GUIDES));
      return SEED_GUIDES;
    }
    return JSON.parse(raw) as Guide[];
  } catch {
    return SEED_GUIDES;
  }
}

export function saveGuide(guide: Guide): void {
  const guides = getGuides();
  const idx = guides.findIndex((g) => g.id === guide.id);
  if (idx >= 0) {
    guides[idx] = guide;
  } else {
    guides.push(guide);
  }
  localStorage.setItem(GUIDES_KEY, JSON.stringify(guides));
}

export function getGuideById(id: string): Guide | null {
  return getGuides().find((g) => g.id === id) ?? null;
}

export function getBookings(): Booking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}
