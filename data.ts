import { SearchResult } from './types';

const DATES_URL = 'https://videos.openai.com/az/vg-assets/task_01kh5t66xyfb2s5311chte73c7%2F1770795575_img_1.webp?se=2026-02-17T13%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=EIW/y%2BWVzU5%2B/QxRNj8TrRlyFRvKzQjbTr/%2B6xWu9u0%3D&ac=oaivgprodscus2';

const PRAYER_MAT_URL = 'https://videos.openai.com/az/vg-assets/task_01kh60zh69e7t8cqer0pzae057%2F1770802653_img_1.webp?se=2026-02-17T13%3A00%3A00Z&sp=r&sv=2026-02-06&sr=b&skoid=cfbc986b-d2bc-4088-8b71-4f962129715b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-02-11T12%3A15%3A03Z&ske=2026-02-18T12%3A20%3A03Z&sks=b&skv=2026-02-06&sig=c/T40haW7HltvtARQvD310c6Ngvuabgfw%2BCI5N5jW0E%3D&ac=oaivgprodscus2';

export const STATIC_RESULTS: SearchResult[] = [
  {
    id: '1',
    thumbnail: DATES_URL,
    preview: DATES_URL,
    camera: 'Dining Hall - Cam 04',
    timestamp: '2024-03-24 18:30:05',
    score: 98,
    tags: ['dates', 'fruit', 'snack', 'ramadan', 'food', 'breaking fast']
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1563294340-9a4f49202613?auto=format&fit=crop&q=80&w=600',
    preview: 'https://images.unsplash.com/photo-1563294340-9a4f49202613?auto=format&fit=crop&q=80&w=1200',
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
  }
];
