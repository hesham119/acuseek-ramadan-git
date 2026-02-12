import { SearchResult } from './types';

const DATES_URL = 'https://videos.openai.com/az/vg-assets/task_01kh5t66xyfb2s5311chte73c7%2F1770795575_img_1.webp?se=2026-02-17T13%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=EIW/y%2BWVzU5%2B/QxRNj8TrRlyFRvKzQjbTr/%2B6xWu9u0%3D&ac=oaivgprodscus2';

const IFTAR_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8b622cek5ajcpx1tq9q9gm%2F1770880461_img_1.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=r9TPHJrzOymdDDMA/ccixLanEOXg/UxDVaah2dbLZH8%3D&ac=oaivgprodscus2';

const PRAYER_MAT_URL = 'https://videos.openai.com/az/vg-assets/task_01kh60zh69e7t8cqer0pzae057%2F1770802653_img_1.webp?se=2026-02-17T13%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=c/T40haW7HltvtARQvD310c6Ngvuabgfw%2BCI5N5jW0E%3D&ac=oaivgprodscus2';

const LANTERN_KIDS_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8bra8zfvxbgqh36qfapwgx%2F1770881068_img_1.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=IMDcshi7ZZkGngA8pCVUvKXvDEPZGPjHMXVDgryww64%3D&ac=oaivgprodscus2';

const LANTERN_KIDS_2_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8bgechf41bd0x9bzgw51wd%2F1770880798_img_1.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=AD5KCTqvolZqOMRNCE0uhKePlYxK7T%2B7hUpQ5jRfMRM%3D&ac=oaivgprodscus2';

const PRAYER_PERSON_URL = 'https://videos.openai.com/az/vg-assets/task_01kh8bdvcsfw4v4rn77xcw7caw%2F1770880713_img_0.webp?se=2026-02-18T00%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=CxffpSKeekvZpqsofgImaKQt6pfIy1%2BHVoMnH%2BR38MA%3D&ac=oaivgprodscus2';

export const STATIC_RESULTS: SearchResult[] = [
  {
    id: '1',
    thumbnail: DATES_URL,
    preview: DATES_URL,
    camera: 'Dining Hall - Cam 04',
    timestamp: '2024-03-24 18:30:05',
    score: 88,
    tags: ['dates', 'fruit', 'snack', 'ramadan', 'food', 'breaking fast', 'lantern', 'ramadan kareem']
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
    id: '3',
    thumbnail: PRAYER_MAT_URL,
    preview: PRAYER_MAT_URL,
    camera: 'Prayer Room - Cam 02',
    timestamp: '2024-03-24 19:15:20',
    score: 92,
    tags: ['prayer mat', 'prayer', 'mat', 'ramadan', 'salah', 'worship']
  },
  {
    id: '4',
    thumbnail: LANTERN_KIDS_URL,
    preview: LANTERN_KIDS_URL,
    camera: 'Outdoor Courtyard - Cam 05',
    timestamp: '2024-03-24 19:45:00',
    score: 96,
    tags: ['lantern', 'kids', 'children', 'ramadan', 'lights', 'celebration', 'festive']
  },
  {
    id: '5',
    thumbnail: LANTERN_KIDS_2_URL,
    preview: LANTERN_KIDS_2_URL,
    camera: 'Main Hallway - Cam 03',
    timestamp: '2024-03-24 19:50:15',
    score: 94,
    tags: ['lantern', 'kids', 'children', 'ramadan', 'lights', 'celebration']
  },
  {
    id: '6',
    thumbnail: PRAYER_PERSON_URL,
    preview: PRAYER_PERSON_URL,
    camera: 'Prayer Hall - Cam 06',
    timestamp: '2024-03-24 19:20:00',
    score: 97,
    tags: ['prayer', 'prayer mat', 'someone praying', 'ramadan', 'salah', 'worship']
  }
];