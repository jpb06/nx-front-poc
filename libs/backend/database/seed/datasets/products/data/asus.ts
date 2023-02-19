import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export const asusProducts: Array<Product> = [
  {
    id: uuidv4(),
    brand: 'ASUS',
    name: "ASUS 34' LED - ROG Strix XG349C",
    pictureUrl: '/asus/asus-XG349C.jpg',
    description: '3440 x 1440 pixels - 1 ms - 21/9',
    points: 200,
  },
  {
    id: uuidv4(),
    brand: 'ASUS',
    name: "ASUS 27' LED - ROG Strix XG27AQ-W",
    pictureUrl: '/asus/asus-XG27AQ-W.jpg',
    description: '2560 x 1440 pixels - 1 ms - 16/9',
    points: 100,
  },
  {
    id: uuidv4(),
    brand: 'ASUS',
    name: "ASUS 21.5' LED - VA229QSB",
    pictureUrl: '/asus/asus-VA229QSB.jpg',
    description: '1920 x 1080 pixels - 5 ms - 16/9',
    points: 50,
  },
];
