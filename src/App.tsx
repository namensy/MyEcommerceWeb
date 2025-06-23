import Navigation from "./components/Navigation";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CssBaseline } from "@mui/material";

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import Footer from "./components/Footer";
import ProductsDetailPage from "./pages/ProductsDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timeout);
  // }, [loading]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/shop/products/:productId"
          element={<ProductsDetailPage />}
        />
        <Route path="/shop/cart" element={<CartPage />} />
        <Route path="/shop/cart/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
