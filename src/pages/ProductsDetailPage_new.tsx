import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Rating,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";

// Interface สำหรับข้อมูล Product จาก DummyJSON API
interface Product {
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
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  tags?: string[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

type ProductParams = {
  productId?: string;
};

const ProductsDetailPage = ({}) => {
  const { productId } = useParams<ProductParams>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const { addItem } = useCartContext();

  // ดึงข้อมูล Product จาก API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios(
          `https://dummyjson.com/products/${productId}`
        );
        if (!response.data) throw new Error("Product not found");
        const data = await response.data;
        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddtoCart = () => {
    const productWithQuantity = {
      ...product,
      quantity: quantity,
    };
    addItem(productWithQuantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading product...</Typography>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error || "Product not found"}
        </Typography>
      </Container>
    );
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: { xs: 2, md: 3 } }}
      >
        <MuiLink
          component={RouterLink}
          to="/"
          color="text.secondary"
          underline="none"
        >
          Home
        </MuiLink>
        <MuiLink
          component={RouterLink}
          to="/shop"
          color="text.secondary"
          underline="none"
        >
          Shop
        </MuiLink>
        <Typography color="text.primary">{productId}</Typography>
      </Breadcrumbs>

      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Image Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={{ xs: 1, md: 2 }}>
            {/* Main Image */}
            <Box
              component="img"
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.title}
              sx={{
                width: "100%",
                height: { xs: "300px", md: "400px" },
                objectFit: "contain",
                borderRadius: { xs: 2, md: 3 },
                bgcolor: "#f5f5f5",
              }}
            />

            {/* Thumbnail Images */}
            <Stack direction="row" spacing={1} sx={{ overflowX: "auto" }}>
              {product.images.slice(0, 4).map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
                  sx={{
                    width: { xs: 60, md: 80 },
                    height: { xs: 60, md: 80 },
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    border:
                      selectedImage === index
                        ? "2px solid #1976d2"
                        : "1px solid #e0e0e0",
                    "&:hover": { borderColor: "#1976d2" },
                    flexShrink: 0,
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </Grid>

        {/* Product Info Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            {/* Title */}
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                fontSize: { xs: "1.5rem", md: "2.125rem" },
                lineHeight: { xs: 1.3, md: 1.2 },
              }}
            >
              {product.title.toUpperCase()}
            </Typography>

            {/* Rating */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Rating
                value={product.rating}
                precision={0.1}
                readOnly
                size={isMobile ? "small" : "medium"}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
              >
                {product.rating}/5
              </Typography>
            </Stack>

            {/* Price */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
              >
                ${discountedPrice.toFixed(2)}
              </Typography>
              {product.discountPercentage > 0 && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="h5"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                      fontSize: { xs: "1.125rem", md: "1.5rem" },
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "red",
                      bgcolor: "#ffebee",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                    }}
                  >
                    -{product.discountPercentage.toFixed(0)}%
                  </Typography>
                </Stack>
              )}
            </Stack>

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
            >
              {product.description}
            </Typography>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                >
                  Tags
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {product.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Quantity & Add to Cart */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  width: "fit-content",
                  alignSelf: { xs: "center", sm: "flex-start" },
                }}
              >
                <IconButton
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  sx={{ borderRadius: 0, p: { xs: 1, md: 1.5 } }}
                >
                  <RemoveIcon fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
                <Typography
                  sx={{
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 0.5, md: 1 },
                    minWidth: { xs: 35, md: 40 },
                    textAlign: "center",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  sx={{ borderRadius: 0, p: { xs: 1, md: 1.5 } }}
                >
                  <AddIcon fontSize={isMobile ? "small" : "medium"} />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.2, md: 1.5 },
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  "&:hover": { bgcolor: "#333" },
                }}
                onClick={() => handleAddtoCart()}
              >
                Add to Cart
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ mt: { xs: 4, md: 6 } }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              fontSize: { xs: "0.875rem", md: "1rem" },
              minHeight: { xs: 40, md: 48 },
            },
          }}
        >
          <Tab label="Product Details" />
          <Tab label="Rating & Reviews" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {/* Product Details */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight={600}
                sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                Product Details
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size={isMobile ? "small" : "medium"}>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Brand</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.brand}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>SKU</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        PRD-{product.id.toString().padStart(3, "0")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Weight</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.weight || "N/A"} kg
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Dimensions</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.dimensions
                          ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Shipping Information */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight={600}
                sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                Shipping Information
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size={isMobile ? "small" : "medium"}>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Shipping Info</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.shippingInformation || "Standard shipping"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Availability</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.availabilityStatus || "In Stock"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Min Order</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.minimumOrderQuantity || 1} pieces
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Return Policy</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.returnPolicy || "30 days return"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Additional Info */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight={600}
                sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
              >
                Additional Info
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size={isMobile ? "small" : "medium"}>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Category</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.category}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Stock</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.stock} pieces
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Warranty</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.warrantyInformation || "1 year warranty"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        <strong>Rating</strong>
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                      >
                        {product.rating}/5 stars
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
          >
            Rating & Reviews
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
          >
            Reviews feature coming soon...
          </Typography>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default ProductsDetailPage;
