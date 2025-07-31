// types.ts

export interface Seller {
  id: number;
  userId: number;
  bio: string;
  imageUrl: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  productId: number;
  userId: number;
  createdAt: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  sellerId: number;
  createdAt: string;
  seller: Seller;
  reviews: Review[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
