export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  discount?: string;
}

export const newArrivals: Product[] = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    image: "/images/new-arrivals/t-shirt.png",
    price: 1200,
    category: "t-shirt",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    image: "/images/new-arrivals/blue-jeans.png",
    price: 890,
    category: "jeans",
    rating: 3.5,
    discount: "20%",
  },
  {
    id: 3,
    name: "Chekered Shirt",
    image: "/images/new-arrivals/checkered-shirt.png",
    price: 1390,
    category: "shirts",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    image: "/images/new-arrivals/sleeve-striped-tshirt.png",
    price: 1090,
    category: "t-shirts",
    rating: 4.5,
    discount: "30%",
  },
];

export const topSelling: Product[] = [
  {
    id: 5,
    name: "Vertical Striped Shirt",
    image: "/images/top-selling/vertical-striped-shirt.png",
    price: 2120,
    category: "shirts",
    rating: 5.0,
    discount: "20%",
  },
  {
    id: 6,
    name: "Courage Graphic T-shirt",
    image: "/images/top-selling/courage-graphic-tshirt.png",
    price: 1450,
    category: "t-shirts",
    rating: 4.0,
  },
  {
    id: 7,
    name: "Loose Fit Bermuda Shorts",
    image: "/images/top-selling/loose-fit-bermuda-shorts.png",
    price: 800,
    category: "shorts",
    rating: 3.0,
  },
  {
    id: 8,
    name: "Faded Skinny Jeans",
    image: "/images/top-selling/faded-skinny-jeans.png",
    price: 2100,
    category: "jeans",
    rating: 4.5,
  },
];

export const allProduct = {
  item: [...newArrivals, ...topSelling],
};

export const getProductsById = (id: number): Product | undefined => {
  const allProducts = [...newArrivals, ...topSelling];
  return allProducts.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  const allProducts = [...newArrivals, ...topSelling];
  return allProducts.filter((product) => product.category === category);
};

export const searchProducts = (keyword: string): Product[] => {
  const allProducts = [...newArrivals, ...topSelling];
  return allProducts.filter((products) => {
    const searchTerm = keyword.toLowerCase();
    const productName = products.name.toLowerCase();
    return productName.includes(searchTerm);
  });
};
