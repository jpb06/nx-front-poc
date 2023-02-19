import { Product } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export const appleProducts: Array<Product> = [
  {
    id: uuidv4(),
    brand: 'Apple',
    name: "Macbook pro 13'",
    pictureUrl: '/apple/macbook-13.jpg',
    description: 'Apple M2 Chip 8-Core, 8 GB RAM, 512 GB SSD, 10-Core GPU',
    points: 300,
  },
  {
    id: uuidv4(),
    brand: 'Apple',
    name: "Macbook pro 14'",
    pictureUrl: '/apple/macbook-14.jpg',
    description: 'Apple M2 Pro Chip 12-Core, 16 GB RAM, 1 TB SSD, 16-Core GPU',
    points: 400,
  },
  {
    id: uuidv4(),
    brand: 'Apple',
    name: "Macbook pro 16'",
    pictureUrl: '/apple/macbook-16.jpg',
    description: 'Apple M2 Pro Chip 12-Core, 32 GB RAM, 1 TB SSD, 19-Core GPU',
    points: 500,
  },
];
