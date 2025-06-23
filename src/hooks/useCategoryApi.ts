import axios from "axios";
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ReturnProp {
  products: Product[];
  loading: boolean;
  error: string | null;
}

interface ApiParams {
  category?: string;
  searchTerm?: string;
}

const useCategoryApi = ({ category, searchTerm }: ApiParams): ReturnProp => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let url: string;

        if (searchTerm) {
          // ค้นหาสินค้าตาม searchTerm
          url = `https://dummyjson.com/products/search?q=${searchTerm}`;
        } else if (category) {
          // ดึงสินค้าตาม category
          url = `https://dummyjson.com/products/category/${category}`;
        } else {
          // ดึงสินค้าทั้งหมด (default)
          url = `https://dummyjson.com/products`;
        }

        const response = await axios(url);
        const data = response.data;
        setProducts(data.products);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchTerm]);

  return {
    products,
    loading,
    error,
  };
};

export default useCategoryApi;
