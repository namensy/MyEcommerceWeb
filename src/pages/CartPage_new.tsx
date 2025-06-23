import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  TextField,
  Breadcrumbs,
  Link,
  Divider,
  Stack,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useCartContext } from "../contexts/CartContext";

type Props = {};

function CartPage({}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Mock data สำหรับตะกร้าสินค้า
  const { items, updateQuantity, removeItem } = useCartContext();

  const [promoCode, setPromoCode] = useState("");

  // คำนวณราคารวม
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountPercent = 20;
  const discount = Math.floor(subtotal * (discountPercent / 100));
  const deliveryFee = 15;
  const total = (subtotal - discount + deliveryFee).toFixed(2);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: { xs: 2, md: 3 } }}
      >
        <Link href="/" color="text.secondary" underline="none">
          Home
        </Link>
        <Typography color="text.primary">Cart</Typography>
      </Breadcrumbs>

      {/* Page Title */}
      <Typography
        variant="h3"
        fontWeight={700}
        mb={{ xs: 3, md: 4 }}
        sx={{ fontSize: { xs: "1.75rem", md: "3rem" } }}
      >
        YOUR CART
      </Typography>

      <Grid container spacing={{ xs: 3, md: 6 }}>
        {/* Cart Items Section */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            {items.map((item) => (
              <Paper
                key={item.id}
                elevation={0}
                sx={{
                  p: { xs: 1.5, md: 2 },
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={{ xs: 1, md: 2 }} alignItems="center">
                  {/* Product Image */}
                  <Grid size={{ xs: 3, md: 2 }}>
                    {" "}
                    <img
                      src={item.thumbnail || "/placeholder-image.jpg"}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: isMobile ? "80px" : "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        backgroundColor: "#f5f5f5",
                      }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.currentTarget;
                        target.style.backgroundColor = "#f0f0f0";
                        target.alt = "No Image";
                      }}
                    />
                  </Grid>

                  {/* Product Details */}
                  <Grid size={{ xs: 9, md: 6 }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      gutterBottom
                      sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                    >
                      Brand: <strong>{item.brand}</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                    >
                      Stock: <strong>{item.stock}</strong> pieces available
                    </Typography>
                  </Grid>

                  {/* Price - Hidden on Mobile, shown on larger screens */}
                  {!isMobile && (
                    <Grid size={2}>
                      <Typography variant="h6" fontWeight={700}>
                        ${item.price}
                      </Typography>
                    </Grid>
                  )}

                  {/* Quantity Controls */}
                  <Grid size={{ xs: 8, md: 1.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e0e0e0",
                        borderRadius: 25,
                        width: "fit-content",
                        mx: { xs: "auto", md: "unset" },
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        sx={{ borderRadius: 0, p: { xs: 0.5, md: 1 } }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{
                          px: { xs: 1.5, md: 2 },
                          py: 0.5,
                          minWidth: { xs: 30, md: 40 },
                          textAlign: "center",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        sx={{ borderRadius: 0, p: { xs: 0.5, md: 1 } }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Grid>

                  {/* Delete Button */}
                  <Grid size={{ xs: 4, md: 0.5 }}>
                    <IconButton
                      color="error"
                      onClick={() => removeItem(item.id)}
                      sx={{
                        color: "#ff4444",
                        mx: { xs: "auto", md: "unset" },
                        display: "block",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>

                  {/* Price on Mobile - Below other content */}
                  {isMobile && (
                    <Grid size={12}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        textAlign="center"
                        sx={{ mt: 1, fontSize: "1.125rem" }}
                      >
                        ${item.price}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* Order Summary Section */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 3 },
              border: "1px solid #e0e0e0",
              borderRadius: 2,
              position: { md: "sticky" },
              top: { md: 20 },
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              gutterBottom
              sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
            >
              Order Summary
            </Typography>

            <Stack spacing={2} sx={{ my: { xs: 2, md: 3 } }}>
              {/* Subtotal */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  Subtotal
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  ${subtotal}
                </Typography>
              </Box>

              {/* Discount */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  Discount (-{discountPercent}%)
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  color="error"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  -${discount}
                </Typography>
              </Box>

              {/* Delivery Fee */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  Delivery Fee
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  ${deliveryFee}
                </Typography>
              </Box>

              <Divider />

              {/* Total */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ fontSize: { xs: "1.125rem", md: "1.25rem" } }}
                >
                  Total
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}
                >
                  ${total}
                </Typography>
              </Box>
            </Stack>

            {/* Promo Code */}
            <Box sx={{ my: { xs: 2, md: 3 } }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  p: 1,
                  border: "1px solid #e0e0e0",
                  borderRadius: 25,
                }}
              >
                <LocalOfferIcon
                  sx={{ color: "#666", alignSelf: "center", ml: 1 }}
                />
                <TextField
                  placeholder="Add promo code"
                  variant="standard"
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  slotProps={{
                    input: {
                      disableUnderline: true,
                    },
                  }}
                  sx={{
                    "& .MuiInputBase-input": {
                      padding: { xs: "6px 4px", md: "8px 4px" },
                      fontSize: { xs: "0.875rem", md: "1rem" },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    borderRadius: 20,
                    textTransform: "none",
                    px: { xs: 2, md: 3 },
                    fontSize: { xs: "0.75rem", md: "0.875rem" },
                    "&:hover": {
                      bgcolor: "#333",
                    },
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Box>

            {/* Checkout Button */}
            <Link
              component={RouterLink}
              to="/shop/cart/checkout"
              color="inherit"
              underline="none"
            >
              <Button
                variant="contained"
                fullWidth
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: "black",
                  color: "white",
                  py: { xs: 1.2, md: 1.5 },
                  borderRadius: 25,
                  textTransform: "none",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#333",
                  },
                }}
              >
                Go to Checkout
              </Button>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartPage;
