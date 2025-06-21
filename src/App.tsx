import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { ShoppingBag as ShoppingBagIcon } from "@mui/icons-material";
import {
  Box,
  Container,
  Typography,
  Button,
  CssBaseline,
  Grid,
  IconButton,
  CardMedia,
} from "@mui/material";
import CountUp from "react-countup";
import HeroSection from "./components/HeroSection";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <HeroSection />
    </ThemeProvider>
  );
}

export default App;
