import { SearchResult } from './types';

const DATES_URL = 'https://i.imgur.com/OioTkdP.jpeg';
const IFTAR_URL = 'https://i.imgur.com/o7gWRJQ.jpeg';
const IFTAR_3_URL = 'https://i.imgur.com/oNuefvQ.jpeg';
const IFTAR_4_URL = 'https://i.imgur.com/Uqtq3Qf.jpeg';
const IFTAR_5_URL = 'https://i.imgur.com/8oT0iKl.png';
const LANTERN_KIDS_URL = 'https://i.imgur.com/ogy6ELJ.jpeg';
const LANTERN_KIDS_2_URL = 'https://i.imgur.com/q0sn2q7.jpeg';
const LANTERN_NEW_URL = 'https://i.imgur.com/fDRFEvI.png';
const LANTERN_KIDS_3_URL = 'https://i.imgur.com/InUIRPv.png';
const SWEETS_BOX_URL_1 = 'https://i.imgur.com/oXC2Oa7.jpeg';
const SWEETS_BOX_URL_2 = 'https://i.imgur.com/DBhBQsp.jpeg';
const DRUMMER_ALLEY_URL = 'https://i.imgur.com/Iitu7qs.jpeg';
const DRUMMER_FESTIVE_URL = 'https://i.imgur.com/2QwUBKc.jpeg';
const DRUMMER_TRADITIONAL_1 = 'https://i.imgur.com/zWDSurQ.png';
const DRUMMER_TRADITIONAL_2 = 'https://i.imgur.com/cOBbprO.png';
const MOSQUE_COURTYARD_URL = 'https://i.imgur.com/Z0wv2Mi.jpeg';
const MOSQUE_ENTRANCE_URL = 'https://i.imgur.com/vCj6B04.jpeg';
const IFTAR_CANNON_URL = 'https://i.imgur.com/z34QecQ.jpeg';

export const STATIC_RESULTS: SearchResult[] = [
  {
    id: '1',
    thumbnail: DATES_URL,
    preview: DATES_URL,
    camera: 'Dining Hall - Cam 04',
    timestamp: '2024-03-24 18:30:05',
    score: 88,
    tags: ['dates', 'fruit', 'snack', 'tamr', 'dates box', 'fanoos', 'dates next to lantern'],
    rois: [
      { label: 'Dates Box', tags: ['dates', 'box', 'tray', 'fruit'], box: { t: 35, l: 35, w: 45, h: 40 } },
      { label: 'Fanoos', tags: ['lantern', 'fanoos', 'fanous'], box: { t: 15, l: 5, w: 30, h: 70 } }
    ]
  },
  {
    id: '2',
    thumbnail: IFTAR_URL,
    preview: IFTAR_URL,
    camera: 'Main Entrance - Cam 01',
    timestamp: '2024-03-24 18:45:12',
    score: 100,
    tags: ['iftar', 'dinner', 'gathering', 'ramadan', 'table', 'food', 'meal', 'people having iftar meal', 'community breaking fast'],
    rois: [
      { label: 'People Eating', tags: ['people', 'gathering', 'community', 'iftar'], box: { t: 15, l: 15, w: 75, h: 65 } },
      { label: 'Iftar Meal', tags: ['iftar', 'table', 'food', 'meal'], box: { t: 55, l: 10, w: 80, h: 35 } }
    ]
  },
  {
    id: '18',
    thumbnail: IFTAR_5_URL,
    preview: IFTAR_5_URL,
    camera: 'Community Center - Cam 06',
    timestamp: '2024-03-25 18:50:45',
    score: 100,
    tags: ['iftar', 'dinner', 'gathering', 'ramadan', 'table', 'food', 'meal', 'people having iftar meal', 'breaking fast together', 'community dinner'],
    rois: [
      { label: 'People', tags: ['people', 'gathering', 'iftar'], box: { t: 20, l: 10, w: 80, h: 50 } },
      { label: 'Meal Table', tags: ['table', 'food', 'iftar'], box: { t: 60, l: 5, w: 90, h: 30 } }
    ]
  },
  {
    id: '7',
    thumbnail: IFTAR_3_URL,
    preview: IFTAR_3_URL,
    camera: 'Banquet Hall - Cam 07',
    timestamp: '2024-03-26 18:55:00',
    score: 100,
    tags: ['iftar', 'dinner', 'feast', 'ramadan', 'celebration', 'gathering', 'food', 'meal', 'people having iftar meal at long tables'],
    rois: [
      { label: 'Iftar Tables', tags: ['iftar', 'table', 'food', 'meal'], box: { t: 25, l: 5, w: 90, h: 70 } },
      { label: 'People', tags: ['people', 'gathering', 'celebration'], box: { t: 10, l: 10, w: 80, h: 40 } }
    ]
  },
  {
    id: '15',
    thumbnail: IFTAR_4_URL,
    preview: IFTAR_4_URL,
    camera: 'Street Banquet - Cam 05',
    timestamp: '2024-03-30 18:42:10',
    score: 100,
    tags: ['iftar', 'dinner', 'gathering', 'ramadan', 'table', 'food', 'meal', 'people having iftar meal', 'street feast', 'community dinner'],
    rois: [
      { label: 'Long Table', tags: ['iftar', 'table', 'food'], box: { t: 30, l: 0, w: 100, h: 60 } },
      { label: 'People', tags: ['people', 'gathering'], box: { t: 10, l: 10, w: 80, h: 40 } }
    ]
  },
  {
    id: '14',
    thumbnail: IFTAR_CANNON_URL,
    preview: IFTAR_CANNON_URL,
    camera: 'Public Square - CAM 01',
    timestamp: '2021-04-12 18:31:45',
    score: 100,
    tags: ['cannon', 'iftar cannon', 'madfa-al-iftar', 'madfa', 'firing', 'tradition', 'plaza', 'square', 'public square', 'firing madfa in square'],
    rois: [
      { label: 'Iftar Cannon', tags: ['cannon', 'madfa'], box: { t: 40, l: 30, w: 30, h: 40 } },
      { label: 'Crowd', tags: ['people', 'crowd'], box: { t: 60, l: 0, w: 100, h: 40 } }
    ]
  },
  {
    id: '4',
    thumbnail: LANTERN_KIDS_URL,
    preview: LANTERN_KIDS_URL,
    camera: 'Outdoor Courtyard - Cam 05',
    timestamp: '2024-03-24 19:45:00',
    score: 100,
    tags: ['lantern', 'fanous', 'fanoos', 'fanus', 'kids', 'children', 'ramadan', 'lights', 'celebration', 'festive', 'playing', 'children playing with lanterns'],
    rois: [
      { label: 'Children', tags: ['kids', 'children', 'boys'], box: { t: 25, l: 15, w: 70, h: 70 } },
      { label: 'Lanterns', tags: ['lantern', 'fanoos', 'fanous', 'lights'], box: { t: 45, l: 30, w: 40, h: 45 } }
    ]
  },
  {
    id: '5',
    thumbnail: LANTERN_KIDS_2_URL,
    preview: LANTERN_KIDS_2_URL,
    camera: 'Main Hallway - Cam 03',
    timestamp: '2024-03-24 19:50:15',
    score: 100,
    tags: ['lantern', 'fanous', 'fanoos', 'fanus', 'kids', 'children', 'ramadan', 'lights', 'celebration', 'playing', 'kids playing with lanterns'],
    rois: [
      { label: 'Children', tags: ['kids', 'children', 'boys'], box: { t: 15, l: 20, w: 60, h: 80 } },
      { label: 'Fanoos', tags: ['lantern', 'fanoos', 'fanous'], box: { t: 40, l: 35, w: 30, h: 45 } }
    ]
  },
  {
    id: '16',
    thumbnail: LANTERN_NEW_URL,
    preview: LANTERN_NEW_URL,
    camera: 'Main Plaza - Cam 02',
    timestamp: '2024-03-25 20:05:30',
    score: 100,
    tags: ['lantern', 'fanous', 'fanoos', 'fanus', 'kids', 'children', 'ramadan', 'lights', 'celebration', 'playing', 'children playing with lanterns in the plaza', 'new fanoos display'],
    rois: [
      { label: 'Lantern Display', tags: ['lantern', 'fanoos', 'lights'], box: { t: 20, l: 20, w: 60, h: 60 } }
    ]
  },
  {
    id: '17',
    thumbnail: LANTERN_KIDS_3_URL,
    preview: LANTERN_KIDS_3_URL,
    camera: 'Side Walk - Cam 08',
    timestamp: '2024-03-26 19:15:22',
    score: 100,
    tags: ['lantern', 'fanous', 'fanoos', 'fanus', 'kids', 'children', 'ramadan', 'lights', 'celebration', 'playing', 'kids playing with lantern', 'traditional lantern'],
    rois: [
      { label: 'Children', tags: ['kids', 'children'], box: { t: 30, l: 15, w: 70, h: 65 } },
      { label: 'Fanoos', tags: ['lantern', 'fanoos'], box: { t: 45, l: 35, w: 30, h: 40 } }
    ]
  },
  {
    id: '8',
    thumbnail: SWEETS_BOX_URL_1,
    preview: SWEETS_BOX_URL_1,
    camera: 'Entrance Hallway - Cam 03',
    timestamp: '2021-04-04 02:15:00',
    score: 99,
    tags: ['sweets', 'baklava', 'dessert', 'gift box', 'ramadan kareem sign', 'door', 'hallway', 'lantern', 'fanous', 'fanoos', 'fanus', 'crescent moon'],
    rois: [
      { label: 'Baklava Box', tags: ['baklava', 'sweets', 'box', 'gift'], box: { t: 50, l: 40, w: 45, h: 35 } },
      { label: 'Crescent Moon', tags: ['moon', 'crescent', 'decoration'], box: { t: 30, l: 5, w: 30, h: 60 } }
    ]
  },
  {
    id: '9',
    thumbnail: SWEETS_BOX_URL_2,
    preview: SWEETS_BOX_URL_2,
    camera: 'Entrance Hallway - Cam 03',
    timestamp: '2021-04-04 02:15:45',
    score: 100,
    tags: ['sweets', 'baklava', 'box', 'door', 'sign', 'floor', 'hallway', 'lantern', 'decoration', 'entrance', 'gift'],
    rois: [
      { label: 'Sweets Box', tags: ['sweets', 'baklava', 'box'], box: { t: 45, l: 35, w: 50, h: 40 } },
      { label: 'Ramadan Sign', tags: ['sign', 'ramadan', 'kareem'], box: { t: 70, l: 15, w: 50, h: 25 } }
    ]
  },
  {
    id: '10',
    thumbnail: DRUMMER_ALLEY_URL,
    preview: DRUMMER_ALLEY_URL,
    camera: 'Narrow Alley - Cam 04',
    timestamp: '2021-04-15 00:14:00',
    score: 98,
    tags: ['drum', 'drummer', 'alley', 'night', 'lantern', 'fanous', 'fanoos', 'fanus', 'suhoor', 'mesaharaty', 'man with a drum'],
    rois: [
      { label: 'Mesaharaty', tags: ['mesaharaty', 'drummer', 'man'], box: { t: 15, l: 30, w: 40, h: 80 } },
      { label: 'Drum', tags: ['drum', 'percussion'], box: { t: 55, l: 35, w: 25, h: 25 } }
    ]
  },
  {
    id: '11',
    thumbnail: DRUMMER_FESTIVE_URL,
    preview: DRUMMER_FESTIVE_URL,
    camera: 'Decorated Street - Zan Da',
    timestamp: '2027-04-15 02:00:00',
    score: 100,
    tags: ['drum', 'drummer', 'lights', 'banners', 'festive', 'street', 'night', 'decorations', 'suhoor', 'mesaharaty', 'mesaharaty walking in street'],
    rois: [
      { label: 'Mesaharaty', tags: ['mesaharaty', 'drummer', 'man'], box: { t: 10, l: 35, w: 35, h: 85 } },
      { label: 'Festival Lights', tags: ['lights', 'decorations', 'banners'], box: { t: 0, l: 0, w: 100, h: 40 } }
    ]
  },
  {
    id: '19',
    thumbnail: DRUMMER_TRADITIONAL_1,
    preview: DRUMMER_TRADITIONAL_1,
    camera: 'Old Quarter - Cam 12',
    timestamp: '2024-03-27 02:45:10',
    score: 100,
    tags: ['drum', 'drummer', 'mesaharaty', 'suhoor', 'night', 'tradition', 'traditional drummer', 'man with drum'],
    rois: [
      { label: 'Mesaharaty', tags: ['mesaharaty', 'man'], box: { t: 20, l: 30, w: 40, h: 70 } }
    ]
  },
  {
    id: '20',
    thumbnail: DRUMMER_TRADITIONAL_2,
    preview: DRUMMER_TRADITIONAL_2,
    camera: 'Residential Street - Cam 11',
    timestamp: '2024-03-28 03:15:00',
    score: 100,
    tags: ['drum', 'drummer', 'mesaharaty', 'suhoor', 'night', 'tradition', 'street drummer', 'musaharaty'],
    rois: [
      { label: 'Mesaharaty', tags: ['mesaharaty', 'man'], box: { t: 15, l: 25, w: 50, h: 75 } }
    ]
  },
  {
    id: '12',
    thumbnail: MOSQUE_COURTYARD_URL,
    preview: MOSQUE_COURTYARD_URL,
    camera: 'Mosque Courtyard - Cam 04',
    timestamp: '2021-03-28 04:35:17',
    score: 100,
    tags: ['mosque', 'courtyard', 'crescent', 'moon', 'star', 'lights', 'banners', 'night', 'people', 'plaza', 'fanoos', 'lantern', 'festive', 'mosque courtyard at night'],
    rois: [
      { label: 'Crescent Moon', tags: ['crescent', 'moon', 'lights'], box: { t: 5, l: 35, w: 40, h: 50 } },
      { label: 'Mosque Plaza', tags: ['mosque', 'masjid', 'plaza', 'courtyard'], box: { t: 40, l: 0, w: 100, h: 60 } }
    ]
  },
  {
    id: '13',
    thumbnail: MOSQUE_ENTRANCE_URL,
    preview: MOSQUE_ENTRANCE_URL,
    camera: 'Mosque Entrance - Cam 09',
    timestamp: '2024-03-29 20:15:00',
    score: 100,
    tags: ['mosque', 'masjid', 'entrance', 'lights', 'decorations', 'plaza', 'night', 'celebration', 'festive', 'lantern', 'crescent', 'grand mosque entrance'],
    rois: [
      { label: 'Mosque Portal', tags: ['entrance', 'gate', 'mosque'], box: { t: 15, l: 15, w: 70, h: 75 } },
      { label: 'Ramadan Lights', tags: ['lantern', 'fanoos', 'lights', 'decorations'], box: { t: 0, l: 5, w: 90, h: 35 } }
    ]
  }
];