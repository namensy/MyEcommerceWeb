import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  styled,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Badge, { badgeClasses } from "@mui/material/Badge";

type Props = {};

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Navigation = (props: Props) => {
  return (
    <Box>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "white",
          height: "120px",
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
          {/* Left side - Logo */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", md: "2.5rem" },
              marginLeft: "100px",
            }}
          >
            SHOP.CO
          </Typography>

          {/* Center - Navigation Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontSize: "28px",
                fontWeight: "normal",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              Shop
            </Button>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontSize: "28px",
                fontWeight: "normal",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              On Sale
            </Button>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontSize: "28px",
                fontWeight: "normal",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              New Arrivals
            </Button>
            <Button
              sx={{
                color: "black",
                textTransform: "none",
                fontSize: "28px",
                fontWeight: "normal",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              Brands
            </Button>
          </Box>

          {/* Right side - Search & Icons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Search Box */}
            <TextField
              placeholder="Search for products..."
              variant="standard"
              size="medium"
              sx={{
                width: { xs: "150px", md: "300px" },
                transition: "all",
                transitionDuration: "1000",
                "&:focus": {
                  width: { xs: "150px", md: "400px" },
                },
                "& .MuiInputBase-input": {
                  padding: "10px 15px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#666" }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Cart Icon */}
            <IconButton
              sx={{
                color: "black",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              <ShoppingCartIcon fontSize="large" />
              <CartBadge badgeContent={2} color="warning" overlap="circular" />
            </IconButton>

            {/* Account Icon */}
            <IconButton
              sx={{
                color: "black",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
