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

export interface Category {
  id: number;
  name: string;
  createdAt: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  sellerId: number;
  createdAt: string;
  seller: Seller;
  reviews: Review[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "SELLER" | "ADMIN" | "BUYER";
  isEmailVerified: boolean;
  verificationToken: string | null;
  createdAt: string;
}

export interface Seller {
  id: number;
  userId: number;
  bio: string;
  imageUrl: string;
  user: User;
  products: Product[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
