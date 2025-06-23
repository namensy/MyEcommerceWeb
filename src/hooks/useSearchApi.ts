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
  productList: Product[];
  loading: boolean;
  error: string | null;
}

const useSearchApi = (searchTerm: string): ReturnProp => {
  const [productList, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios(
          `https://dummyjson.com/products/search?q=${searchTerm}`
        );
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
  }, [searchTerm]);

  return {
    productList,
    loading,
    error,
  };
};

export default useSearchApi;
