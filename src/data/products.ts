import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Tôm Sú Tươi',
    price: 320000,
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg',
    description: 'Tôm sú tươi ngon, size lớn, được nuôi trong môi trường sạch. Thích hợp để nướng, hấp hoặc làm các món chiên xào.',
    unit: 'kg',
    category: 'Tôm',
    inStock: true
  },
  {
    id: 2,
    name: 'Cua Biển Tươi Sống',
    price: 450000,
    image: 'https://images.pexels.com/photos/1395319/pexels-photo-1395319.jpeg',
    description: 'Cua biển tươi sống, thịt chắc ngọt, màu đỏ tự nhiên. Thích hợp để hấp, nướng hoặc nấu lẩu.',
    unit: 'kg',
    category: 'Cua',
    inStock: true
  },
  {
    id: 3,
    name: 'Cá Hồi Na Uy',
    price: 680000,
    image: 'https://images.pexels.com/photos/3296641/pexels-photo-3296641.jpeg',
    description: 'Cá hồi Na Uy nhập khẩu, thịt hồng đẹp, giàu omega-3. Tuyệt vời để làm sashimi hoặc nướng.',
    unit: 'kg',
    category: 'Cá',
    inStock: true
  },
  {
    id: 4,
    name: 'Mực Ống Tươi',
    price: 180000,
    image: 'https://images.pexels.com/photos/1539673/pexels-photo-1539673.jpeg',
    description: 'Mực ống tươi ngon, thịt giòn ngọt, kích thước vừa phải. Thích hợp để nướng, chiên hay nấu canh.',
    unit: 'kg',
    category: 'Mực',
    inStock: true
  },
  {
    id: 5,
    name: 'Tôm Hùm Baby',
    price: 1200000,
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg',
    description: 'Tôm hùm baby tươi ngon, thịt ngọt và thơm. Sản phẩm cao cấp phù hợp cho các bữa tiệc sang trọng.',
    unit: 'kg',
    category: 'Tôm hùm',
    inStock: true
  },
  {
    id: 6,
    name: 'Sò Điệp Tươi',
    price: 220000,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    description: 'Sò điệp tươi ngon, thịt ngọt và có mùi biển tự nhiên. Tuyệt vời để nướng mỡ hành hoặc hấp.',
    unit: 'kg',
    category: 'Sò',
    inStock: false
  },
  {
    id: 7,
    name: 'Ghẹ Xanh',
    price: 380000,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    description: 'Ghẹ xanh tươi sống, thịt ngọt và nhiều. Thích hợp để hấp hoặc nấu bún riêu cua.',
    unit: 'kg',
    category: 'Cua',
    inStock: true
  },
  {
    id: 8,
    name: 'Cá Ngừ Đại Dương',
    price: 520000,
    image: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg',
    description: 'Cá ngừ đại dương tươi ngon, thịt đỏ tự nhiên, giàu dinh dưỡng. Phù hợp làm sashimi hoặc nướng.',
    unit: 'kg',
    category: 'Cá',
    inStock: true
  }
];

export const categories = ['Tất cả', 'Tôm', 'Cua', 'Cá', 'Mực', 'Tôm hùm', 'Sò'];