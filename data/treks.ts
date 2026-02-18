export type Difficulty = "Easy" | "Moderate" | "Hard";
export type Region = "Langtang" | "Everest" | "Annapurna" | "Mustang";

export interface TrekItineraryDay {
  day: number;
  title: string;
  description: string;
  elevation: string;
  distance: string;
}

export interface WeatherDay {
  day: string;
  high: number;
  low: number;
  condition: "Sunny" | "Partly Cloudy" | "Cloudy" | "Light Rain" | "Snow";
  wind: string;
}

export interface Trek {
  slug: string;
  name: string;
  region: Region;
  difficulty: Difficulty;
  duration: string;
  durationDays: number;
  distance: string;
  maxElevation: string;
  bestSeason: string;
  aiSafetyScore: number;
  description: string;
  longDescription: string;
  image: string;
  aiAnalysis: {
    riskAssessment: string;
    optimalStartTime: string;
    fitnessRequirements: string;
    acclimatizationNotes: string;
  };
  itinerary: TrekItineraryDay[];
  weather: WeatherDay[];
}

export const treks: Trek[] = [
  {
    slug: "langtang-valley",
    name: "Langtang Valley Trek",
    region: "Langtang",
    difficulty: "Moderate",
    duration: "7 days",
    durationDays: 7,
    distance: "68 km",
    maxElevation: "4,984m",
    bestSeason: "Mar–May, Sep–Nov",
    aiSafetyScore: 92,
    description:
      "A stunning trek through the Langtang Valley with views of glaciers, yak pastures, and Tamang culture.",
    longDescription:
      "The Langtang Valley Trek takes you through one of Nepal's most scenic valleys, offering breathtaking views of Langtang Lirung (7,227m) and surrounding peaks. The trail passes through dense rhododendron forests, traditional Tamang villages, and high-altitude yak pastures. This trek is ideal for those seeking a less-crowded alternative to the Annapurna and Everest regions while still experiencing dramatic Himalayan landscapes.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop",
    aiAnalysis: {
      riskAssessment:
        "Low to moderate risk. The gradual altitude gain allows for good acclimatization. Main concerns are weather changes above 4,000m and the river crossings near Langtang village.",
      optimalStartTime:
        "Depart Kathmandu by 6:30 AM to reach Syabrubesi by early afternoon. Begin the trek no later than 7:00 AM each day to avoid afternoon clouds.",
      fitnessRequirements:
        "Moderate fitness required. You should be comfortable hiking 5-7 hours per day with a daypack. Prior experience above 3,000m is helpful but not essential.",
      acclimatizationNotes:
        "Built-in rest day at Langtang Village (3,430m). AI recommends an additional half-day rest if heart rate remains elevated above 100bpm at rest.",
    },
    itinerary: [
      { day: 1, title: "Kathmandu to Syabrubesi", description: "Drive through winding mountain roads to the trek starting point. Pass through Trisuli Bazaar and enjoy views of terraced hillsides.", elevation: "1,550m", distance: "Drive" },
      { day: 2, title: "Syabrubesi to Lama Hotel", description: "Trek through dense forests of oak and rhododendron. Cross suspension bridges over the Langtang Khola. Wildlife spotting opportunities.", elevation: "2,380m", distance: "14 km" },
      { day: 3, title: "Lama Hotel to Langtang Village", description: "Ascend through bamboo and rhododendron forests. The valley opens up with views of Langtang Lirung. Arrive at the rebuilt Langtang Village.", elevation: "3,430m", distance: "12 km" },
      { day: 4, title: "Langtang Village to Kyanjin Gompa", description: "Gentle walk through yak pastures with panoramic mountain views. Visit the ancient monastery and cheese factory.", elevation: "3,870m", distance: "8 km" },
      { day: 5, title: "Kyanjin Ri Excursion", description: "Early morning hike to Kyanjin Ri (4,773m) or Tserko Ri (4,984m) for spectacular 360-degree mountain views. Return to Kyanjin Gompa.", elevation: "4,773m", distance: "6 km" },
      { day: 6, title: "Kyanjin Gompa to Lama Hotel", description: "Retrace steps downhill through the valley. Enjoy different perspectives of the landscape on the descent.", elevation: "2,380m", distance: "20 km" },
      { day: 7, title: "Lama Hotel to Syabrubesi", description: "Final descent through the forest to Syabrubesi. Celebrate the completed trek. Drive back to Kathmandu.", elevation: "1,550m", distance: "14 km" },
    ],
    weather: [
      { day: "Mon", high: 12, low: 2, condition: "Sunny", wind: "5 km/h" },
      { day: "Tue", high: 10, low: 0, condition: "Partly Cloudy", wind: "8 km/h" },
      { day: "Wed", high: 8, low: -2, condition: "Sunny", wind: "6 km/h" },
      { day: "Thu", high: 6, low: -4, condition: "Cloudy", wind: "12 km/h" },
      { day: "Fri", high: 5, low: -5, condition: "Light Rain", wind: "15 km/h" },
      { day: "Sat", high: 9, low: -1, condition: "Partly Cloudy", wind: "7 km/h" },
      { day: "Sun", high: 11, low: 1, condition: "Sunny", wind: "4 km/h" },
    ],
  },
  {
    slug: "everest-base-camp",
    name: "Everest Base Camp Trek",
    region: "Everest",
    difficulty: "Hard",
    duration: "14 days",
    durationDays: 14,
    distance: "130 km",
    maxElevation: "5,364m",
    bestSeason: "Mar–May, Sep–Nov",
    aiSafetyScore: 85,
    description:
      "The iconic trek to the foot of the world's highest peak, passing through Sherpa villages and dramatic glacial landscapes.",
    longDescription:
      "The Everest Base Camp Trek is the ultimate Himalayan adventure, tracing the footsteps of legendary mountaineers to the base of Mount Everest (8,849m). The journey begins with a thrilling flight to Lukla and winds through the Khumbu region, passing Namche Bazaar, Tengboche Monastery, and the Khumbu Glacier. Along the way, you'll experience Sherpa culture firsthand and witness some of the most dramatic mountain scenery on Earth.",
    image: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=800&h=500&fit=crop",
    aiAnalysis: {
      riskAssessment:
        "Moderate to high risk due to extreme altitude. AMS (Acute Mountain Sickness) is the primary concern above 4,000m. The Lukla flight carries weather-dependent delays. Khumbu Icefall proximity adds glacial risk.",
      optimalStartTime:
        "Fly to Lukla on the earliest available flight (6:00 AM). Begin each trekking day by 6:30 AM. Reach high camps before noon to avoid afternoon weather deterioration.",
      fitnessRequirements:
        "High fitness required. Ability to hike 6-8 hours daily at altitude with 15kg pack. Prior altitude experience above 4,000m strongly recommended. 3 months of cardio preparation advised.",
      acclimatizationNotes:
        "Two mandatory rest days: Namche Bazaar (3,440m) and Dingboche (4,410m). AI will monitor SpO2 levels — descent protocol triggers if SpO2 drops below 85% at rest.",
    },
    itinerary: [
      { day: 1, title: "Kathmandu to Lukla, Trek to Phakding", description: "Scenic 35-minute flight to Lukla (2,860m). Easy introductory trek along the Dudh Kosi river.", elevation: "2,610m", distance: "8 km" },
      { day: 2, title: "Phakding to Namche Bazaar", description: "Cross suspension bridges and ascend steeply to the Sherpa capital. First views of Everest on clear days.", elevation: "3,440m", distance: "11 km" },
      { day: 3, title: "Acclimatization Day in Namche", description: "Hike to Everest View Hotel for panoramic views. Explore the weekly Saturday market and Sherpa museums.", elevation: "3,440m", distance: "5 km" },
      { day: 4, title: "Namche to Tengboche", description: "Trek through rhododendron forest to the famous Tengboche Monastery with stunning Ama Dablam views.", elevation: "3,870m", distance: "10 km" },
      { day: 5, title: "Tengboche to Dingboche", description: "Descend to Debuche, cross the Imja Khola, and climb to the summer farming village of Dingboche.", elevation: "4,410m", distance: "12 km" },
      { day: 6, title: "Acclimatization Day in Dingboche", description: "Hike to Nagarjun Hill (5,100m) for views of Makalu, Lhotse, and the Imja Valley.", elevation: "4,410m", distance: "4 km" },
      { day: 7, title: "Dingboche to Lobuche", description: "Pass the memorial cairns for fallen climbers. Traverse the lateral moraine of the Khumbu Glacier.", elevation: "4,940m", distance: "10 km" },
      { day: 8, title: "Lobuche to Gorak Shep to EBC", description: "Trek to Gorak Shep, drop bags, and continue to Everest Base Camp. Stand at the foot of the world's tallest mountain.", elevation: "5,364m", distance: "13 km" },
      { day: 9, title: "Gorak Shep to Kala Patthar to Pheriche", description: "Pre-dawn ascent of Kala Patthar (5,545m) for the best Everest sunrise views. Descend to Pheriche.", elevation: "4,240m", distance: "16 km" },
      { day: 10, title: "Pheriche to Namche Bazaar", description: "Long descent through familiar terrain. The thicker air feels noticeably easier to breathe.", elevation: "3,440m", distance: "20 km" },
      { day: 11, title: "Namche to Lukla", description: "Final trekking day. Retrace steps to Lukla for a celebration dinner.", elevation: "2,860m", distance: "19 km" },
      { day: 12, title: "Lukla to Kathmandu", description: "Morning flight back to Kathmandu. Buffer day included for weather delays.", elevation: "1,400m", distance: "Flight" },
      { day: 13, title: "Buffer Day", description: "Extra day in case of flight delays from Lukla, which are common due to weather.", elevation: "—", distance: "—" },
      { day: 14, title: "Departure", description: "Transfer to Kathmandu airport or explore the city. Trek complete!", elevation: "1,400m", distance: "—" },
    ],
    weather: [
      { day: "Mon", high: 4, low: -10, condition: "Sunny", wind: "15 km/h" },
      { day: "Tue", high: 2, low: -12, condition: "Partly Cloudy", wind: "20 km/h" },
      { day: "Wed", high: 0, low: -14, condition: "Cloudy", wind: "25 km/h" },
      { day: "Thu", high: -2, low: -16, condition: "Snow", wind: "30 km/h" },
      { day: "Fri", high: 1, low: -12, condition: "Partly Cloudy", wind: "18 km/h" },
      { day: "Sat", high: 3, low: -10, condition: "Sunny", wind: "12 km/h" },
      { day: "Sun", high: 5, low: -8, condition: "Sunny", wind: "10 km/h" },
    ],
  },
  {
    slug: "annapurna-circuit",
    name: "Annapurna Circuit",
    region: "Annapurna",
    difficulty: "Hard",
    duration: "12 days",
    durationDays: 12,
    distance: "160 km",
    maxElevation: "5,416m",
    bestSeason: "Oct–Nov, Mar–Apr",
    aiSafetyScore: 83,
    description:
      "A classic circumnavigation of the Annapurna massif, crossing Thorong La — one of the world's highest trekking passes.",
    longDescription:
      "The Annapurna Circuit is widely considered one of the world's greatest long-distance treks. The route encircles the entire Annapurna massif, passing through an astonishing range of landscapes — from subtropical lowlands and rice paddies to arid high-altitude desert and the dramatic Thorong La pass at 5,416m. You'll experience diverse cultures, from Hindu villages in the lowlands to Tibetan Buddhist communities in the rain shadow of the Himalayas.",
    image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=500&fit=crop",
    aiAnalysis: {
      riskAssessment:
        "High risk at Thorong La pass (5,416m). Sudden weather changes and altitude sickness are primary concerns. The pass should only be attempted in good weather. Avalanche risk on north-facing slopes in spring.",
      optimalStartTime:
        "Begin Thorong La pass day at 4:00 AM to reach the summit by 8:00 AM before winds increase. Other days start by 7:00 AM.",
      fitnessRequirements:
        "High fitness essential. You must sustain 7-9 hours of hiking per day over varied terrain. Thorong La requires 10+ hours. Altitude training and 4 months of preparation recommended.",
      acclimatizationNotes:
        "Rest days at Manang (3,540m) and Upper Pisang. AI monitors for headache, nausea, and sleep quality. Automatic descent recommendation if Lake Louise Score exceeds 5.",
    },
    itinerary: [
      { day: 1, title: "Kathmandu to Besisahar to Chame", description: "Drive to Besisahar and continue to Chame. Enter the Annapurna Conservation Area.", elevation: "2,710m", distance: "Drive" },
      { day: 2, title: "Chame to Upper Pisang", description: "Trek through apple orchards and pine forests with first views of Annapurna II.", elevation: "3,310m", distance: "15 km" },
      { day: 3, title: "Upper Pisang to Manang", description: "High trail with panoramic views. Pass through Ghyaru and Ngawal villages.", elevation: "3,540m", distance: "18 km" },
      { day: 4, title: "Acclimatization in Manang", description: "Day hikes to Ice Lake (4,600m) or Gangapurna Lake. Visit the Himalayan Rescue Association clinic.", elevation: "3,540m", distance: "6 km" },
      { day: 5, title: "Manang to Yak Kharka", description: "Gradual ascent through increasingly barren landscape. Views of Chulu peaks.", elevation: "4,018m", distance: "10 km" },
      { day: 6, title: "Yak Kharka to Thorong Phedi", description: "Short but important day. Arrive early and rest for the big pass crossing tomorrow.", elevation: "4,525m", distance: "8 km" },
      { day: 7, title: "Thorong La Pass to Muktinath", description: "The big day! Cross Thorong La (5,416m) and descend to the sacred temple town of Muktinath.", elevation: "5,416m → 3,800m", distance: "18 km" },
      { day: 8, title: "Muktinath to Jomsom", description: "Descend through the arid Kali Gandaki Valley. Visit Kagbeni's medieval fortress.", elevation: "2,720m", distance: "20 km" },
      { day: 9, title: "Jomsom to Tatopani", description: "Continue through the world's deepest gorge. Reward yourself with natural hot springs.", elevation: "1,190m", distance: "22 km" },
      { day: 10, title: "Tatopani to Ghorepani", description: "Steep climb through terraced farmland and rhododendron forest to the viewpoint village.", elevation: "2,860m", distance: "14 km" },
      { day: 11, title: "Poon Hill Sunrise, Descend to Nayapul", description: "Pre-dawn hike to Poon Hill (3,210m) for sunrise over Dhaulagiri and Annapurna. Descend to road head.", elevation: "1,070m", distance: "18 km" },
      { day: 12, title: "Nayapul to Pokhara", description: "Short drive to the lakeside city of Pokhara. Celebrate with lakeside dining.", elevation: "827m", distance: "Drive" },
    ],
    weather: [
      { day: "Mon", high: 8, low: -6, condition: "Sunny", wind: "10 km/h" },
      { day: "Tue", high: 6, low: -8, condition: "Sunny", wind: "14 km/h" },
      { day: "Wed", high: 4, low: -10, condition: "Partly Cloudy", wind: "22 km/h" },
      { day: "Thu", high: 2, low: -14, condition: "Cloudy", wind: "28 km/h" },
      { day: "Fri", high: -1, low: -18, condition: "Snow", wind: "35 km/h" },
      { day: "Sat", high: 3, low: -12, condition: "Partly Cloudy", wind: "16 km/h" },
      { day: "Sun", high: 7, low: -5, condition: "Sunny", wind: "8 km/h" },
    ],
  },
  {
    slug: "gokyo-lakes",
    name: "Gokyo Lakes Trek",
    region: "Everest",
    difficulty: "Hard",
    duration: "12 days",
    durationDays: 12,
    distance: "112 km",
    maxElevation: "5,357m",
    bestSeason: "Mar–May, Oct–Nov",
    aiSafetyScore: 86,
    description:
      "Explore the turquoise lakes of Gokyo and summit Gokyo Ri for one of the best Everest panoramas in Nepal.",
    longDescription:
      "The Gokyo Lakes Trek offers a stunning alternative to the classic Everest Base Camp route, taking you to the pristine turquoise lakes of Gokyo at the foot of the Ngozumpa Glacier — the largest glacier in Nepal. The highlight is the ascent of Gokyo Ri (5,357m), which provides arguably the best panoramic view of Mount Everest, Lhotse, Makalu, and Cho Oyu. This trek sees fewer crowds while delivering equally spectacular scenery.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop",
    aiAnalysis: {
      riskAssessment:
        "Moderate to high risk. Altitude is the primary concern with rapid elevation gain after Dole. Ngozumpa Glacier crossing requires careful navigation. Lake margins can be unstable.",
      optimalStartTime:
        "Gokyo Ri summit attempt should begin at 4:30 AM. Glacier crossings should be done before 10:00 AM when ice becomes less stable.",
      fitnessRequirements:
        "High fitness needed. Must handle 6-8 hours of daily trekking at altitude. Glacier walking experience is beneficial. Strong cardiovascular endurance required for Gokyo Ri.",
      acclimatizationNotes:
        "Rest day mandatory at Namche Bazaar (3,440m). Additional rest day at Machhermo (4,470m) if symptoms appear. AI will adjust schedule based on real-time SpO2 and heart rate data.",
    },
    itinerary: [
      { day: 1, title: "Kathmandu to Lukla, Trek to Phakding", description: "Fly to Lukla and begin trekking along the Dudh Kosi river.", elevation: "2,610m", distance: "8 km" },
      { day: 2, title: "Phakding to Namche Bazaar", description: "Ascend to the Sherpa capital with first Everest views from the ridge.", elevation: "3,440m", distance: "11 km" },
      { day: 3, title: "Acclimatization in Namche", description: "Day hike to Thame or the Everest View Hotel. Explore markets and museums.", elevation: "3,440m", distance: "5 km" },
      { day: 4, title: "Namche to Dole", description: "Leave the main EBC trail and head into the quieter Gokyo Valley.", elevation: "4,110m", distance: "12 km" },
      { day: 5, title: "Dole to Machhermo", description: "Short day through yak pastures. Visit the HRA post for altitude briefing.", elevation: "4,470m", distance: "8 km" },
      { day: 6, title: "Machhermo to Gokyo", description: "Pass the first and second Gokyo lakes. Arrive at the main settlement by the third lake.", elevation: "4,790m", distance: "10 km" },
      { day: 7, title: "Gokyo Ri Summit Day", description: "Pre-dawn climb to Gokyo Ri (5,357m) for spectacular sunrise over four 8,000m peaks. Afternoon rest.", elevation: "5,357m", distance: "4 km" },
      { day: 8, title: "Explore Fourth and Fifth Lakes", description: "Day trip to the upper lakes. Walk along the Ngozumpa Glacier edge.", elevation: "5,000m", distance: "10 km" },
      { day: 9, title: "Gokyo to Dole", description: "Begin descent. The return journey feels faster with thicker air.", elevation: "4,110m", distance: "18 km" },
      { day: 10, title: "Dole to Namche Bazaar", description: "Rejoin the main trail. Final night in Namche for supplies and celebration.", elevation: "3,440m", distance: "12 km" },
      { day: 11, title: "Namche to Lukla", description: "Long descent to Lukla. Farewell dinner with trekking crew.", elevation: "2,860m", distance: "19 km" },
      { day: 12, title: "Lukla to Kathmandu", description: "Morning flight back. Buffer time included for weather delays.", elevation: "1,400m", distance: "Flight" },
    ],
    weather: [
      { day: "Mon", high: 3, low: -12, condition: "Sunny", wind: "12 km/h" },
      { day: "Tue", high: 1, low: -14, condition: "Partly Cloudy", wind: "18 km/h" },
      { day: "Wed", high: -1, low: -16, condition: "Cloudy", wind: "22 km/h" },
      { day: "Thu", high: 2, low: -13, condition: "Sunny", wind: "14 km/h" },
      { day: "Fri", high: 0, low: -15, condition: "Snow", wind: "28 km/h" },
      { day: "Sat", high: 4, low: -10, condition: "Sunny", wind: "10 km/h" },
      { day: "Sun", high: 3, low: -11, condition: "Partly Cloudy", wind: "15 km/h" },
    ],
  },
  {
    slug: "mardi-himal",
    name: "Mardi Himal Trek",
    region: "Annapurna",
    difficulty: "Moderate",
    duration: "5 days",
    durationDays: 5,
    distance: "42 km",
    maxElevation: "4,500m",
    bestSeason: "Oct–Dec, Feb–Apr",
    aiSafetyScore: 94,
    description:
      "A short but spectacular ridge trek offering intimate views of Machhapuchhre (Fishtail) and the Annapurna range.",
    longDescription:
      "The Mardi Himal Trek is one of Nepal's best-kept secrets — a short, off-the-beaten-path trek that delivers jaw-dropping views of Machhapuchhre (Fishtail), Annapurna South, and Hiunchuli. The trail follows a stunning ridgeline through rhododendron forests, bamboo groves, and high alpine meadows. Perfect for trekkers with limited time who want an authentic Himalayan experience without the crowds.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    aiAnalysis: {
      riskAssessment:
        "Low risk overall. The ridge trail can be exposed in bad weather. Minor trail-finding challenges above High Camp as the path is less defined. No major river crossings.",
      optimalStartTime:
        "Start by 6:00 AM from High Camp for the viewpoint — clouds typically roll in by 10:00 AM. Other days can start at 7:30 AM.",
      fitnessRequirements:
        "Moderate fitness. Comfortable with 5-6 hours of daily hiking. The climb from Low Camp to High Camp is steep — good leg strength needed. Suitable for fit beginners.",
      acclimatizationNotes:
        "Short trek with gradual gain. One night at Low Camp (3,580m) provides adequate acclimatization for the 4,500m viewpoint. No mandatory rest days needed for most trekkers.",
    },
    itinerary: [
      { day: 1, title: "Pokhara to Deurali", description: "Drive to Kande and begin trekking through beautiful rhododendron and oak forests.", elevation: "3,100m", distance: "10 km" },
      { day: 2, title: "Deurali to Low Camp", description: "Trek along the ridge with expanding views. Pass through high forest and into alpine meadows.", elevation: "3,580m", distance: "8 km" },
      { day: 3, title: "Low Camp to High Camp", description: "Steep ascent above the treeline. Machhapuchhre looms impossibly close. Sunset views over the Annapurnas.", elevation: "3,900m", distance: "6 km" },
      { day: 4, title: "High Camp to Mardi Himal Viewpoint", description: "Early morning ascent to the viewpoint (4,500m). 360-degree panorama of the Annapurna Sanctuary. Descend to Forest Camp.", elevation: "4,500m → 2,500m", distance: "12 km" },
      { day: 5, title: "Forest Camp to Pokhara", description: "Final descent through the forest to Sidhing. Drive back to Pokhara.", elevation: "827m", distance: "8 km" },
    ],
    weather: [
      { day: "Mon", high: 14, low: 2, condition: "Sunny", wind: "8 km/h" },
      { day: "Tue", high: 12, low: 0, condition: "Sunny", wind: "10 km/h" },
      { day: "Wed", high: 10, low: -2, condition: "Partly Cloudy", wind: "12 km/h" },
      { day: "Thu", high: 8, low: -4, condition: "Cloudy", wind: "18 km/h" },
      { day: "Fri", high: 11, low: -1, condition: "Sunny", wind: "8 km/h" },
      { day: "Sat", high: 13, low: 1, condition: "Sunny", wind: "6 km/h" },
      { day: "Sun", high: 12, low: 0, condition: "Partly Cloudy", wind: "10 km/h" },
    ],
  },
  {
    slug: "poon-hill",
    name: "Poon Hill Trek",
    region: "Annapurna",
    difficulty: "Easy",
    duration: "4 days",
    durationDays: 4,
    distance: "38 km",
    maxElevation: "3,210m",
    bestSeason: "Oct–Nov, Mar–May",
    aiSafetyScore: 97,
    description:
      "Nepal's most popular short trek — famous for its iconic sunrise over Dhaulagiri and the Annapurna range from Poon Hill.",
    longDescription:
      "The Poon Hill Trek (also known as the Ghorepani Poon Hill Trek) is the perfect introduction to trekking in Nepal. This short but rewarding trail takes you through charming Gurung villages, dense rhododendron forests (spectacular when blooming in spring), and culminates at the famous Poon Hill viewpoint at 3,210m. The sunrise from Poon Hill, with Dhaulagiri (8,167m), Annapurna South, and Machhapuchhre lined up before you, is one of the most iconic views in the Himalayas.",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&h=500&fit=crop",
    aiAnalysis: {
      riskAssessment:
        "Very low risk. Well-maintained trail with excellent teahouse infrastructure. Maximum altitude of 3,210m poses minimal AMS risk. Suitable for families and first-time trekkers.",
      optimalStartTime:
        "Depart Ghorepani at 4:30 AM for the Poon Hill sunrise. Other trekking days can begin at 8:00 AM comfortably.",
      fitnessRequirements:
        "Basic fitness sufficient. The trek involves 4-5 hours of daily hiking on well-maintained stone steps. The climb to Ghorepani has 3,300 stone steps — moderate knee fitness needed.",
      acclimatizationNotes:
        "No acclimatization issues expected at this altitude. AI will still monitor vitals as a precaution. Hydration reminders will be provided throughout.",
    },
    itinerary: [
      { day: 1, title: "Pokhara to Tikhedhunga", description: "Drive to Nayapul, then trek through rice paddies and past waterfalls to Tikhedhunga.", elevation: "1,540m", distance: "9 km" },
      { day: 2, title: "Tikhedhunga to Ghorepani", description: "Climb the famous 3,300 stone steps. Pass through the Gurung village of Ulleri and into rhododendron forest.", elevation: "2,860m", distance: "11 km" },
      { day: 3, title: "Poon Hill Sunrise, Trek to Tadapani", description: "Wake at 4:00 AM for the climb to Poon Hill. Watch the sun illuminate the Himalayan giants. Trek onwards through forest.", elevation: "3,210m → 2,630m", distance: "12 km" },
      { day: 4, title: "Tadapani to Pokhara", description: "Descend through forests to Ghandruk village. Explore traditional Gurung architecture. Drive to Pokhara.", elevation: "827m", distance: "10 km" },
    ],
    weather: [
      { day: "Mon", high: 16, low: 4, condition: "Sunny", wind: "5 km/h" },
      { day: "Tue", high: 14, low: 2, condition: "Partly Cloudy", wind: "8 km/h" },
      { day: "Wed", high: 15, low: 3, condition: "Sunny", wind: "6 km/h" },
      { day: "Thu", high: 12, low: 1, condition: "Cloudy", wind: "10 km/h" },
      { day: "Fri", high: 13, low: 2, condition: "Light Rain", wind: "12 km/h" },
      { day: "Sat", high: 15, low: 4, condition: "Sunny", wind: "5 km/h" },
      { day: "Sun", high: 16, low: 5, condition: "Sunny", wind: "4 km/h" },
    ],
  },
  {
    slug: "manaslu-circuit",
    name: "Manaslu Circuit Trek",
    region: "Langtang",
    difficulty: "Hard",
    duration: "14 days",
    durationDays: 14,
    distance: "177 km",
    maxElevation: "5,106m",
    bestSeason: "Sep–Nov, Mar–May",
    aiSafetyScore: 81,
    description:
      "A remote, restricted-area circuit around Mt. Manaslu — Nepal's eighth-highest peak — through pristine landscapes and Tibetan villages.",
    longDescription:
      "The Manaslu Circuit is often called the new Annapurna Circuit, offering the same diversity of landscapes and cultures with a fraction of the trekkers. This restricted-area trek circles Mount Manaslu (8,163m), the eighth-highest peak in the world, crossing the dramatic Larkya La pass at 5,106m. The route passes through lush subtropical valleys, bamboo forests, and high-altitude Tibetan Buddhist villages, offering a genuinely remote trekking experience.",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&h=500&fit=crop",
    aiAnalysis: {
      riskAssessment:
        "High risk. Remote area with limited rescue options. Larkya La (5,106m) is the crux — impassable in heavy snow. River crossings can be dangerous during monsoon. Restricted area requires special permits and a guide.",
      optimalStartTime:
        "Larkya La crossing must begin at 3:30 AM. Allow 10-12 hours for the full crossing day. Other days start by 6:30 AM due to long distances.",
      fitnessRequirements:
        "Excellent fitness essential. Multi-day sections with 8-10 hours of hiking. Larkya La day is extremely demanding. High-altitude mountaineering experience strongly recommended.",
      acclimatizationNotes:
        "Mandatory rest days at Samagaon (3,530m) and Samdo (3,860m). The approach provides gradual altitude gain. AI will enforce rest protocols — the remoteness makes rescue difficult.",
    },
    itinerary: [
      { day: 1, title: "Kathmandu to Soti Khola", description: "Long drive to the trailhead through the Buri Gandaki valley.", elevation: "730m", distance: "Drive" },
      { day: 2, title: "Soti Khola to Machha Khola", description: "Trek through subtropical forest along the Buri Gandaki river. Waterfalls and suspension bridges.", elevation: "870m", distance: "18 km" },
      { day: 3, title: "Machha Khola to Jagat", description: "Enter the restricted area. Pass through Khorlabesi with its hot springs.", elevation: "1,340m", distance: "16 km" },
      { day: 4, title: "Jagat to Deng", description: "Cross to the west bank. Trail carved into cliff faces above the river.", elevation: "1,860m", distance: "14 km" },
      { day: 5, title: "Deng to Namrung", description: "Enter Nubri Valley. Tibetan influence becomes apparent in architecture and prayer flags.", elevation: "2,660m", distance: "16 km" },
      { day: 6, title: "Namrung to Samagaon", description: "Views of Manaslu open up. Arrive at the largest village on the circuit.", elevation: "3,530m", distance: "14 km" },
      { day: 7, title: "Rest Day in Samagaon", description: "Acclimatization day. Optional hike to Manaslu Base Camp viewpoint or Birendra Tal lake.", elevation: "3,530m", distance: "6 km" },
      { day: 8, title: "Samagaon to Samdo", description: "Short trek to the last village before the pass. Tibetan Buddhist gompa visits.", elevation: "3,860m", distance: "8 km" },
      { day: 9, title: "Rest Day in Samdo", description: "Final acclimatization. Short hike toward the Tibetan border for mountain views.", elevation: "3,860m", distance: "4 km" },
      { day: 10, title: "Samdo to Dharamsala", description: "Trek to the high camp below Larkya La. Basic stone shelter accommodation.", elevation: "4,460m", distance: "10 km" },
      { day: 11, title: "Larkya La Crossing to Bimthang", description: "The crux day. Cross Larkya La (5,106m) and descend steeply to the lush Bimthang meadow.", elevation: "5,106m → 3,590m", distance: "22 km" },
      { day: 12, title: "Bimthang to Tilije", description: "Descend through forest back into the Marshyangdi Valley. Rejoin civilization.", elevation: "2,300m", distance: "18 km" },
      { day: 13, title: "Tilije to Dharapani", description: "Final trekking day through rice paddies and villages. Possible to join the Annapurna Circuit trail.", elevation: "1,860m", distance: "14 km" },
      { day: 14, title: "Dharapani to Kathmandu", description: "Long drive back to Kathmandu via Besisahar. Trek complete!", elevation: "1,400m", distance: "Drive" },
    ],
    weather: [
      { day: "Mon", high: 5, low: -8, condition: "Sunny", wind: "10 km/h" },
      { day: "Tue", high: 3, low: -10, condition: "Partly Cloudy", wind: "16 km/h" },
      { day: "Wed", high: 1, low: -14, condition: "Cloudy", wind: "24 km/h" },
      { day: "Thu", high: -2, low: -18, condition: "Snow", wind: "32 km/h" },
      { day: "Fri", high: 0, low: -15, condition: "Partly Cloudy", wind: "20 km/h" },
      { day: "Sat", high: 4, low: -9, condition: "Sunny", wind: "12 km/h" },
      { day: "Sun", high: 6, low: -7, condition: "Sunny", wind: "8 km/h" },
    ],
  },
  {
    slug: "upper-mustang",
    name: "Upper Mustang Trek",
    region: "Mustang",
    difficulty: "Moderate",
    duration: "10 days",
    durationDays: 10,
    distance: "95 km",
    maxElevation: "3,850m",
    bestSeason: "Jun–Sep (monsoon shadow)",
    aiSafetyScore: 90,
    description:
      "Journey to the forbidden kingdom of Lo Manthang — a desert landscape of red cliffs, ancient caves, and Tibetan Buddhist culture.",
    longDescription:
      "Upper Mustang is like stepping into another world — a rain-shadow desert landscape of eroded red and ochre cliffs, ancient cave dwellings, and the medieval walled city of Lo Manthang. This restricted-area trek follows the old salt trade route between Tibet and Nepal through one of the last preserves of traditional Tibetan Buddhist culture. Unlike most Nepal treks, Upper Mustang is best visited during the monsoon season (June–September) when the rest of Nepal is drenched in rain.",
    image: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&h=500&fit=crop",
    aiAnalysis: {
      riskAssessment:
        "Low to moderate risk. Altitude remains relatively modest (max 3,850m). Primary concerns are strong winds in the afternoon, river crossings that swell during monsoon, and remoteness from medical facilities.",
      optimalStartTime:
        "Start by 7:00 AM daily. Winds pick up dramatically after 1:00 PM in the Kali Gandaki corridor — plan to be at your destination by noon.",
      fitnessRequirements:
        "Moderate fitness. Days are 5-6 hours of walking on relatively flat terrain with some passes. The dry, dusty conditions require good respiratory health. Less technically demanding than high-altitude treks.",
      acclimatizationNotes:
        "Gradual altitude gain along the route. No specific rest days needed for acclimatization. The maximum elevation of 3,850m is well within safe limits for most trekkers with 1-2 days adjustment.",
    },
    itinerary: [
      { day: 1, title: "Pokhara to Jomsom", description: "Scenic flight to Jomsom along the Kali Gandaki gorge. Afternoon exploration of the windy town.", elevation: "2,720m", distance: "Flight" },
      { day: 2, title: "Jomsom to Kagbeni to Chele", description: "Walk through Kagbeni — gateway to Upper Mustang. Enter the restricted area. Climb to Chele.", elevation: "3,050m", distance: "14 km" },
      { day: 3, title: "Chele to Syangboche", description: "Cross dramatic passes with views of Nilgiri and Tilicho Peak. Enter the desert landscape.", elevation: "3,475m", distance: "12 km" },
      { day: 4, title: "Syangboche to Ghami", description: "Pass the longest mani wall in Nepal. Dramatic red cliff formations and cave dwellings.", elevation: "3,520m", distance: "15 km" },
      { day: 5, title: "Ghami to Lo Manthang", description: "Cross the final pass and descend to the walled city of Lo Manthang — the capital of the Kingdom of Lo.", elevation: "3,810m", distance: "14 km" },
      { day: 6, title: "Explore Lo Manthang", description: "Full day exploring the medieval walled city. Visit the Royal Palace, Thubchen Gompa, and Jampa Lhakhang.", elevation: "3,810m", distance: "5 km" },
      { day: 7, title: "Lo Manthang to Dhi", description: "Visit Choser caves and the sky caves on an alternate return route. Descend to Dhi village.", elevation: "3,400m", distance: "16 km" },
      { day: 8, title: "Dhi to Ghiling", description: "Trek through dramatic erosion formations. Stop at ancient monasteries along the way.", elevation: "3,570m", distance: "14 km" },
      { day: 9, title: "Ghiling to Kagbeni", description: "Return to Kagbeni via an alternate trail through Tangbe village and its apple orchards.", elevation: "2,810m", distance: "18 km" },
      { day: 10, title: "Kagbeni to Jomsom, Fly to Pokhara", description: "Short walk to Jomsom. Afternoon flight to Pokhara (weather permitting). Trek complete!", elevation: "2,720m", distance: "10 km" },
    ],
    weather: [
      { day: "Mon", high: 18, low: 4, condition: "Sunny", wind: "20 km/h" },
      { day: "Tue", high: 17, low: 3, condition: "Sunny", wind: "25 km/h" },
      { day: "Wed", high: 16, low: 2, condition: "Partly Cloudy", wind: "22 km/h" },
      { day: "Thu", high: 15, low: 1, condition: "Partly Cloudy", wind: "28 km/h" },
      { day: "Fri", high: 17, low: 3, condition: "Sunny", wind: "18 km/h" },
      { day: "Sat", high: 18, low: 5, condition: "Sunny", wind: "15 km/h" },
      { day: "Sun", high: 16, low: 2, condition: "Cloudy", wind: "24 km/h" },
    ],
  },
];

export function getTrekBySlug(slug: string): Trek | undefined {
  return treks.find((t) => t.slug === slug);
}
