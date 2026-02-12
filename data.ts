import { SearchResult } from './types';

const DATES_URL = 'https://videos.openai.com/az/vg-assets/task_01kh5t66xyfb2s5311chte73c7%2F1770795575_img_1.webp?se=2026-02-17T13%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=EIW/y%2BWVzU5%2B/QxRNj8TrRlyFRvKzQjbTr/%2B6xWu9u0%3D&ac=oaivgprodscus2';

const IFTAR_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8b622cek5ajcpx1tq9q9gm%2F1770880461_img_1.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=r9TPHJrzOymdDDMA/ccixLanEOXg/UxDVaah2dbLZH8%3D&ac=oaivgprodscus2';

const IFTAR_3_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8scqgbe3eb8f2ef2tj9cmr%2F1770895358_img_0.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=o82EC51qGFGOEtuwDQ7vFC31A7ZHhwEz0pszW8%2BxUtc%3D&ac=oaivgprodscus2';

const LANTERN_KIDS_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8bra8zfvxbgqh36qfapwgx%2F1770881068_img_1.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=IMDcshi7ZZkGngA8pCVUvKXvDEPZGPjHMXVDgryww64%3D&ac=oaivgprodscus2';

const LANTERN_KIDS_2_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8bgechf41bd0x9bzgw51wd%2F1770880798_img_1.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=AD5KCTqvolZqOMRNCE0uhKePlYxK7T%2B7hUpQ5jRfMRM%3D&ac=oaivgprodscus2';

const SWEETS_BOX_URL_1 = 'https://videos.openai.com/az/vg-assets/task_01kh8wf3kqekk8ky4brycy54nm%2F1770898579_img_0.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=x4KnB0NhcvkdNURTca9I98eX3bjIijEX4BVJPMJNn0U%3D&ac=oaivgprodscus2';

const SWEETS_BOX_URL_2 = 'https://videos.openai.com/az/vg-assets/task_01kh8wf3kqekk8ky4brycy54nm%2F1770898579_img_1.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-12T12%3A15%3A03Z&ske=2026-02-19T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=IswwdO%2B78/hH3YW/pslGCPMEO/f/H8R6OlSBoxOlRos%3D&ac=oaivgprodscus2';

const DRUMMER_ALLEY_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8xa1ajerabynrg08fnksc2%2F1770899463_img_0.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-12T12%3A15%3A03Z&ske=2026-02-19T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=I9gd530aXVVBbV0kpVnScZ2231hRPsJgiiXcmY/ClW8%3D&ac=oaivgprodscus2';

const DRUMMER_FESTIVE_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8x69freeprbs4qfbe75bcn%2F1770899341_img_1.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-12T12%3A15%3A03Z&ske=2026-02-19T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=QYwakAuHPgYJVGIU8RvhoU5wlB4JPiggXlSEMHntN08%3D&ac=oaivgprodscus2';

export const STATIC_RESULTS: SearchResult[] = [
  {
    id: '1',
    thumbnail: DATES_URL,
    preview: DATES_URL,
    camera: 'Dining Hall - Cam 04',
    timestamp: '2024-03-24 18:30:05',
    score: 88,
    tags: ['dates', 'fruit', 'snack', 'ramadan', 'food', 'breaking fast', 'lantern', 'fanous', 'fanoos', 'fanus', 'ramadan kareem']
  },
  {
    id: '2',
    thumbnail: IFTAR_URL,
    preview: IFTAR_URL,
    camera: 'Main Entrance - Cam 01',
    timestamp: '2024-03-24 18:45:12',
    score: 95,
    tags: ['iftar', 'dinner', 'gathering', 'ramadan', 'table', 'food']
  },
  {
    id: '7',
    thumbnail: IFTAR_3_URL,
    preview: IFTAR_3_URL,
    camera: 'Banquet Hall - Cam 07',
    timestamp: '2024-03-26 18:55:00',
    score: 98,
    tags: ['iftar', 'dinner', 'feast', 'ramadan', 'celebration', 'gathering', 'food']
  },
  {
    id: '4',
    thumbnail: LANTERN_KIDS_URL,
    preview: LANTERN_KIDS_URL,
    camera: 'Outdoor Courtyard - Cam 05',
    timestamp: '2024-03-24 19:45:00',
    score: 96,
    tags: ['lantern', 'fanous', 'fanoos', 'fanus', 'kids', 'children', 'ramadan', 'lights', 'celebration', 'festive']
  },
  {
    id: '5',
    thumbnail: LANTERN_KIDS_2_URL,
    preview: LANTERN_KIDS_2_URL,
    camera: 'Main Hallway - Cam 03',
    timestamp: '2024-03-24 19:50:15',
    score: 94,
    tags: ['lantern', 'fanous', 'fanoos', 'fanus', 'kids', 'children', 'ramadan', 'lights', 'celebration']
  },
  {
    id: '8',
    thumbnail: SWEETS_BOX_URL_1,
    preview: SWEETS_BOX_URL_1,
    camera: 'Entrance Hallway - Cam 03',
    timestamp: '2021-04-04 02:15:00',
    score: 99,
    tags: ['sweets', 'baklava', 'dessert', 'gift box', 'ramadan kareem sign', 'door', 'hallway', 'lantern', 'fanous', 'fanoos', 'fanus', 'crescent moon']
  },
  {
    id: '9',
    thumbnail: SWEETS_BOX_URL_2,
    preview: SWEETS_BOX_URL_2,
    camera: 'Entrance Hallway - Cam 03',
    timestamp: '2021-04-04 02:15:45',
    score: 100,
    tags: [
      'Box of sweets by the door',
      'Ramadan Kareem sign on the floor',
      'Baklava tray in the hallway',
      'Lantern and crescent moon decoration',
      'Sweets delivery at the entrance',
      'Fanoos next to a gift box',
      'sweets', 'baklava', 'box', 'door', 'sign', 'floor', 'hallway', 'lantern', 'decoration', 'entrance', 'gift'
    ]
  },
  {
    id: '10',
    thumbnail: DRUMMER_ALLEY_URL,
    preview: DRUMMER_ALLEY_URL,
    camera: 'Narrow Alley - Cam 04',
    timestamp: '2021-04-15 00:14:00',
    score: 98,
    tags: [
      'Man walking with a drum in the street at night',
      'Traditional Ramadan drummer in an alley',
      'Mesaharaty walking with a lantern and drum',
      'A man beating a drum for Suhoor',
      'Old street Ramadan drummer',
      'drum', 'drummer', 'alley', 'night', 'lantern', 'fanous', 'fanoos', 'fanus', 'suhoor', 
      'mesaharaty', 'musaharaty', 'mesaharati', 'musaharati', 'masaharaty', 'masaharati', 'mousaharaty', 'mousaharati', 'misaharaty', 'misaharati'
    ]
  },
  {
    id: '11',
    thumbnail: DRUMMER_FESTIVE_URL,
    preview: DRUMMER_FESTIVE_URL,
    camera: 'Decorated Street - Zan Da',
    timestamp: '2027-04-15 02:00:00',
    score: 100,
    tags: [
      'Man with a drum under Ramadan lights and banners',
      'Ramadan drummer in a festive decorated street',
      'Mesaharaty walking in a lit alleyway',
      'Traditional Suhoor caller with street decorations',
      'Festive street drummer at night',
      'drum', 'drummer', 'lights', 'banners', 'festive', 'street', 'night', 'decorations', 'suhoor', 
      'mesaharaty', 'musaharaty', 'mesaharati', 'musaharati', 'masaharaty', 'masaharati', 'mousaharaty', 'mousaharati', 'misaharaty', 'misaharati'
    ]
  }
];