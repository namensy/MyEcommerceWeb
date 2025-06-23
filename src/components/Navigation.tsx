import Badge, { badgeClasses } from "@mui/material/Badge";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as MuiLink, useMediaQuery, useTheme } from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  styled,
} from "@mui/material";
import { useCartContext } from "../contexts/CartContext";
import { useState } from "react";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -15px;
  }
`;

const Navigation = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const placeholder = isMdUp ? "Search for products..." : "Search";
  const navigate = useNavigate();
  const { items } = useCartContext();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTerm = () => {
    const trimmedSearch = searchTerm.trim();
    if (trimmedSearch) {
      // ส่ง searchTerm ไป ShopPage ผ่าน query parameter
      navigate(`/shop?search=${encodeURIComponent(trimmedSearch)}`);
      setSearchTerm(""); // Clear search input หลัง search
    } else {
      // ถ้าไม่มี search term ไปหน้า shop ปกติ
      navigate("/shop");
    }
  };

  return (
    <Box sx={{ position: "sticky", top: "0", zIndex: "1" }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          height: { xs: "90px", md: "120px" },
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar
          sx={{
            height: "100%",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
          }}
        >
          <MuiLink
            component={RouterLink}
            to="/"
            underline="none"
            color="inherit"
            sx={{
              "&:hover": {
                opacity: "0.8",
              },
            }}
          >
            {" "}
            <Typography
              variant="h5"
              component="div"
              fontFamily="Unbounded Variable"
              textTransform="uppercase"
              sx={{
                color: "black",
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.4rem", md: "2.5rem" },
                ml: { xs: 1, sm: 2, md: "100px" },
              }}
            >
              Dove.CO
            </Typography>
          </MuiLink>{" "}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: { md: 2, lg: 4 },
              alignItems: "center",
            }}
          >
            <MuiLink
              component={RouterLink}
              to="/shop"
              underline="none"
              color="inherit"
            >
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                  fontSize: { md: "20px", lg: "28px" },
                  fontWeight: "normal",
                  px: { md: 1, lg: 2 },
                  "&:hover": {
                    bgcolor: "transparent",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Shop
              </Button>
            </MuiLink>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontSize: { md: "20px", lg: "28px" },
                fontWeight: "normal",
                px: { md: 1, lg: 2 },
                "&:hover": {
                  bgcolor: "transparent",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              On Sale
            </Button>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontSize: { md: "20px", lg: "28px" },
                fontWeight: "normal",
                px: { md: 1, lg: 2 },
                "&:hover": {
                  bgcolor: "transparent",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              New Arrivals
            </Button>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontSize: { md: "20px", lg: "28px" },
                fontWeight: "normal",
                px: { md: 1, lg: 2 },
                "&:hover": {
                  bgcolor: "transparent",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Brands
            </Button>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.5, md: 2 },
            }}
          >
            <TextField
              placeholder={placeholder}
              variant="standard"
              size={isMdUp ? "medium" : "small"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchTerm();
              }}
              sx={{
                width: { xs: "120px", sm: "180px", md: "300px" },
                transition: "all 0.3s ease",
                "&:focus-within": {
                  width: { xs: "140px", sm: "200px", md: "400px" },
                },
                "& .MuiInputBase-input": {
                  padding: { xs: "8px 12px", md: "10px 15px" },
                  fontSize: { xs: "14px", md: "16px" },
                },
                "& .MuiInputBase-root": {
                  "&:before": {
                    borderBottomColor: "#e0e0e0",
                  },
                  "&:hover:before": {
                    borderBottomColor: "#333",
                  },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        sx={{
                          color: "#666",
                          fontSize: { xs: "20px", md: "24px" },
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <MuiLink
              component={RouterLink}
              to="/shop/cart"
              color="text.secondary"
              underline="none"
            >
              <IconButton
                sx={{
                  color: "black",
                  p: { xs: 0.5, md: 1 },
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ShoppingCartIcon
                  sx={{ fontSize: { xs: "28px", md: "32px" } }}
                />
                <CartBadge
                  badgeContent={items.length}
                  color="warning"
                  overlap="circular"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: { xs: "10px", md: "12px" },
                      minWidth: { xs: "16px", md: "20px" },
                      height: { xs: "16px", md: "20px" },
                    },
                  }}
                />
              </IconButton>
            </MuiLink>

            <IconButton
              sx={{
                color: "black",
                p: { xs: 0.5, md: 1 },
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <AccountCircleIcon
                sx={{ fontSize: { xs: "28px", md: "32px" } }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
