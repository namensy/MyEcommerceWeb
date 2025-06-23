import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  Grid,
  Divider,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useCartContext } from "../contexts/CartContext";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { items, getTotalPrice, updateQuantity, removeItem } = useCartContext();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const subtotal = getTotalPrice();
  const shipping = 15;
  const total = subtotal + shipping;
  const handleEmailSubmit = () => {
    if (email && email.includes("@")) {
      setActiveStep(1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Please enter a valid email address.",
      });
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Your cart is empty. Please add items before placing an order.",
      });
      return;
    }

    if (!email || !email.includes("@")) {
      Swal.fire({
        icon: "error",
        title: "Please enter a valid email address.",
      });
      return;
    }

    if (firstName === "" || phoneNumber === "" || address === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Shipping form is invalid!",
      });
      return;
    }

    if (activeStep <= 2) {
      Swal.fire({
        icon: "error",
        title: "Please select payment method",
      });
      return;
    }

    Swal.fire({
      title: "Order placed successfully! ",
      icon: "success",
      html: `Thank you for your order!`,
      draggable: true,
    });
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "firstName":
        return value.length < 2 ? "Name must be at least 2 characters" : "";
      case "lastName":
        return value.length < 2
          ? "Last Name must be at least 2 characters"
          : "";
      case "email":
        return !value.includes("@") ? "Invalid email format" : "";
      case "phone":
        return !/^\d{10}$/.test(value) ? "Phone number must be 10 digits" : "";
      case "address":
        return value.length < 10 ? "Adress must be at least 10 characters" : "";
      default:
        return "";
    }
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Left Side - Checkout Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card elevation={0} sx={{ p: { xs: 2, md: 3 } }}>
            <Typography
              variant="h6"
              sx={{
                mb: { xs: 2, md: 3 },
                fontWeight: "bold",
                fontSize: { xs: "1.125rem", md: "1.25rem" },
              }}
            >
              Express Checkout
            </Typography>
            {/* PayPal Button */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "#0070ba",
                color: "white",
                py: { xs: 1.5, md: 2 },
                mb: { xs: 3, md: 4 },
                textTransform: "none",
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#005ea6",
                },
              }}
            >
              PayPal
            </Button>{" "}
            {/* Step 1: Email */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    width: { xs: 20, md: 24 },
                    height: { xs: 20, md: 24 },
                    borderRadius: "50%",
                    bgcolor: activeStep >= 0 ? "black" : "grey.300",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                    fontSize: { xs: "12px", md: "14px" },
                    fontWeight: "bold",
                  }}
                >
                  1
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  Enter Your Email
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 0 },
                }}
              >
                <TextField
                  placeholder="Email Address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "#f5f5f5",
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                />
                <Button
                  sx={{
                    minWidth: { xs: "auto", sm: "auto" },
                    alignSelf: { xs: "center", sm: "stretch" },
                  }}
                >
                  <KeyboardArrowRightIcon
                    onClick={handleEmailSubmit}
                    sx={{
                      bgcolor: "grey.400",
                      color: "white",
                      display: "block",
                      width: "45px",
                      height: "45px",
                      "&:hover": {
                        bgcolor: "grey.600",
                      },
                    }}
                  />
                </Button>
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                By providing your email, you agree to our Privacy Policy and
                Terms of Service
              </Typography>
            </Box>{" "}
            {/* Step 2: Shipping */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    width: { xs: 20, md: 24 },
                    height: { xs: 20, md: 24 },
                    borderRadius: "50%",
                    bgcolor: activeStep >= 1 ? "black" : "grey.300",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                    fontSize: { xs: "12px", md: "14px" },
                    fontWeight: "bold",
                  }}
                >
                  2
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  Shipping
                </Typography>
              </Box>

              {/* Responsive Shipping Form */}
              <Stack spacing={{ xs: 2, md: 3 }}>
                {/* First Name & Last Name Row */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 2, md: 3 }}
                  sx={{ width: "100%" }}
                >
                  <TextField
                    error={!!errors.firstName}
                    value={firstName}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFirstName(value);
                      const error = validateField("firstName", value);
                      setErrors((prev) => ({ ...prev, firstName: error }));
                    }}
                    label="First Name*"
                    helperText={errors.firstName}
                    size={isMobile ? "small" : "medium"}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Last Name*"
                    size={isMobile ? "small" : "medium"}
                    sx={{ flex: 1 }}
                  />
                </Stack>

                {/* Phone Number */}
                <TextField
                  error={!!errors.phone}
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPhoneNumber(value);
                    const error = validateField("phone", value);
                    setErrors((prev) => ({ ...prev, phone: error }));
                  }}
                  label="Phone*"
                  helperText={errors.phone}
                  size={isMobile ? "small" : "medium"}
                  fullWidth
                />

                {/* Address */}
                <TextField
                  error={!!errors.address}
                  value={address}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAddress(value);
                    const error = validateField("address", value);
                    setErrors((prev) => ({ ...prev, address: error }));
                  }}
                  label="Address*"
                  helperText={errors.address}
                  size={isMobile ? "small" : "medium"}
                  fullWidth
                />

                {/* Apt, Suite */}
                <TextField
                  label="Apt, Suite"
                  size={isMobile ? "small" : "medium"}
                  fullWidth
                />

                {/* City, State, ZIP Row */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 2, md: 3 }}
                  sx={{ width: "100%" }}
                >
                  <TextField
                    label="City*"
                    size={isMobile ? "small" : "medium"}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="State*"
                    size={isMobile ? "small" : "medium"}
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="ZIP Code*"
                    size={isMobile ? "small" : "medium"}
                    sx={{ flex: 1 }}
                  />
                </Stack>

                {/* Country */}
                <TextField
                  label="Country*"
                  size={isMobile ? "small" : "medium"}
                  fullWidth
                />
              </Stack>
            </Box>{" "}
            {/* Step 3: Payment Method */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    width: { xs: 20, md: 24 },
                    height: { xs: 20, md: 24 },
                    borderRadius: "50%",
                    bgcolor: activeStep >= 2 ? "black" : "grey.300",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                    fontSize: { xs: "12px", md: "14px" },
                    fontWeight: "bold",
                  }}
                >
                  3
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  Payment Method
                </Typography>
              </Box>

              {/* Responsive Payment Options */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 2, md: 3 }}
                sx={{ width: "100%" }}
              >
                <Button
                  onClick={() => setActiveStep(3)}
                  sx={{
                    flex: 1,
                    height: { xs: "80px", md: "100px" },
                    p: { xs: 1, md: 2 },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/images/check-out/bank-transfer.png"
                    alt="Bank Transfer"
                    sx={{
                      width: "100%",
                      height: { xs: "60px", md: "80px" },
                      objectFit: "contain",
                      borderRadius: 3,
                      bgcolor: "#f5f5f5",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  />
                </Button>
                <Button
                  onClick={() => setActiveStep(3)}
                  sx={{
                    flex: 1,
                    height: { xs: "80px", md: "100px" },
                    p: { xs: 1, md: 2 },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/images/check-out/visa-mc.png"
                    alt="Visa/Mastercard"
                    sx={{
                      width: "100%",
                      height: { xs: "60px", md: "80px" },
                      objectFit: "contain",
                      borderRadius: 3,
                      bgcolor: "#f5f5f5",
                    }}
                  />
                </Button>
                <Button
                  onClick={() => setActiveStep(3)}
                  sx={{
                    flex: 1,
                    height: { xs: "80px", md: "100px" },
                    p: { xs: 1, md: 2 },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/images/check-out/promptpay.webp"
                    alt="PromptPay"
                    sx={{
                      width: "100%",
                      height: { xs: "60px", md: "80px" },
                      objectFit: "contain",
                      borderRadius: 3,
                      bgcolor: "#f5f5f5",
                    }}
                  />
                </Button>
              </Stack>
            </Box>
          </Card>
        </Grid>{" "}
        {/* Right Side - Order Summary */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card
            elevation={1}
            sx={{
              p: { xs: 2, md: 3 },
              position: { md: "sticky" },
              top: 20,
              mt: { xs: 2, md: 0 },
            }}
          >
            {/* Cart Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: { xs: 2, md: 3 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    mr: 1,
                    fontSize: { xs: "1.125rem", md: "1.25rem" },
                  }}
                >
                  🛒 Cart ({items.length})
                </Typography>
              </Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ fontSize: { xs: "1.125rem", md: "1.25rem" } }}
              >
                ${total.toFixed(2)}
              </Typography>
            </Box>

            {/* Cart Items */}
            {items.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  Your cart is empty
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => (window.location.href = "/shop")}
                >
                  Continue Shopping
                </Button>
              </Box>
            ) : (
              items.map((item) => (
                <Box key={item.id} sx={{ mb: { xs: 2, md: 3 } }}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: { xs: 1.5, md: 2 },
                      flexDirection: { xs: "row" },
                    }}
                  >
                    <Box
                      component="img"
                      src={
                        item.images?.[0]?.number ||
                        item.thumbnail ||
                        "/api/placeholder/80/80"
                      }
                      alt={item.title}
                      sx={{
                        width: { xs: 60, md: 80 },
                        height: { xs: 60, md: 80 },
                        objectFit: "cover",
                        borderRadius: 1,
                        bgcolor: "#f5f5f5",
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          lineHeight: 1.2,
                          mb: 0.5,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {item.size} | {item.color}
                      </Typography>

                      {/* Quantity Controls */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: 1,
                          gap: 0.5,
                        }}
                      >
                        <Button
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          sx={{
                            minWidth: { xs: 24, md: 30 },
                            color: "grey.600",
                            fontSize: { xs: "12px", md: "14px" },
                          }}
                        >
                          -
                        </Button>
                        <Typography
                          sx={{
                            mx: 1,
                            minWidth: 20,
                            textAlign: "center",
                            fontSize: { xs: "0.875rem", md: "1rem" },
                          }}
                        >
                          {item.quantity}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          sx={{
                            minWidth: { xs: 24, md: 30 },
                            color: "grey.600",
                            fontSize: { xs: "12px", md: "14px" },
                          }}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>

                    {/* Price and Remove */}
                    <Box
                      sx={{
                        textAlign: "right",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveItem(item.id)}
                        sx={{
                          color: "grey.500",
                          "&:hover": { color: "red" },
                          p: { xs: 0.5, md: 1 },
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { xs: "14px", md: "16px" } }}
                        >
                          🗑️
                        </Typography>
                      </IconButton>

                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))
            )}

            <Divider sx={{ my: 2 }} />

            {/* Order Summary */}
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  Subtotal
                </Typography>
                <Typography
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  ${subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  Estimated Shipping
                </Typography>
                <Typography
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                >
                  $15
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
                >
                  ${total.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Place Order Button */}
            <Button
              fullWidth
              variant="contained"
              size={isMobile ? "medium" : "large"}
              onClick={handlePlaceOrder}
              sx={{
                bgcolor: "black",
                color: "white",
                py: { xs: 1.5, md: 2 },
                textTransform: "none",
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "grey.800",
                },
              }}
            >
              Place Order
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
