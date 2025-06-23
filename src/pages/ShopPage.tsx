import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Link as MuiLink } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Grid,
  CardMedia,
  Chip,
  Stack,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Fab,
} from "@mui/material";
import useCategoryApi from "../hooks/useCategoryApi";

interface Category {
  slug: string;
  name: string;
  url: string;
}

const ShopPage = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [category, setCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter states (ก่อน Apply)
  const [tempSortBy, setTempSortBy] = useState("default");
  const [tempSelectedCategory, setTempSelectedCategory] =
    useState("mens-shirts");

  // Applied states (หลัง Apply)
  const [appliedSortBy, setAppliedSortBy] = useState("default");
  const [appliedCategory, setAppliedCategory] = useState("mens-shirts");

  // ดึง search term จาก URL query params
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  // กำหนด API parameter ตาม priority: searchTerm > selectedCategory > default
  const apiParam = searchTerm
    ? { searchTerm }
    : { category: appliedCategory.replace(" ", "-").toLowerCase() };

  const { products } = useCategoryApi(apiParam);

  // Function to sort products
  const getSortedProducts = (products: any[], sortType: string) => {
    if (!products) return [];

    const sortedProducts = [...products];

    switch (sortType) {
      case "low-high":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "high-low":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "default":
      default:
        return sortedProducts;
    }
  };
  // Apply filters function
  const applyFilters = () => {
    setAppliedSortBy(tempSortBy);
    setAppliedCategory(tempSelectedCategory);

    // Clear search term เมื่อใช้ category filter
    if (searchTerm) {
      window.history.pushState({}, "", "/shop");
      // Force page reload to clear search state
      window.location.reload();
    }
  };

  // Reset filters function
  const resetFilters = () => {
    setTempSortBy("default");
    setTempSelectedCategory("mens-shirts");
    setAppliedSortBy("default");
    setAppliedCategory("mens-shirts");

    // Clear search term
    if (searchTerm) {
      window.history.pushState({}, "", "/shop");
      window.location.reload();
    }
  };

  // Get sorted products for display
  const displayProducts = getSortedProducts(products, appliedSortBy);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await axios(
          "https://dummyjson.com/products/categories"
        );
        const data = await response.data;
        setCategory(data);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6">Loading products...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }
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
        <Typography color="text.primary">Shop</Typography>
      </Breadcrumbs>

      {/* Mobile Filter Button */}
      {isMobile && (
        <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
          <Fab
            size="medium"
            color="primary"
            onClick={() => setMobileFilterOpen(true)}
            sx={{
              bgcolor: "#ED6C02",
              "&:hover": { bgcolor: "#D84315" },
            }}
          >
            <FilterListIcon />
          </Fab>{" "}
        </Box>
      )}

      <Grid container maxWidth="xl" columns={12} spacing={2}>
        {/* Desktop/Tablet Sidebar */}
        {!isMobile && (
          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
            <Box
              maxWidth="100%"
              border="1px solid grey"
              px={{ xs: "10px", md: "20px" }}
              py="10px"
              borderRadius={5}
              sx={{
                position: { md: "sticky" },
                top: { md: "120px" },
                maxHeight: { md: "calc(100vh - 140px)" },
                overflow: { md: "auto" },
              }}
            >
              <Grid
                container
                columns={12}
                spacing={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Grid size="auto">
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    paddingLeft={2}
                    paddingBottom={1}
                  >
                    Filters
                  </Typography>
                </Grid>
                <Grid size="auto">
                  <TuneIcon
                    sx={{
                      rotate: "90deg",
                      display: "block",
                      marginRight: "20px",
                    }}
                  />
                </Grid>
              </Grid>
              <Accordion
                square={true}
                sx={{
                  boxShadow: "none",
                  maxHeight: "500px",
                  overflow: "auto",
                  position: "sticky",
                  top: "0",
                  "&::-webkit-scrollbar": {
                    width: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    position: "sticky",
                    top: "0",
                    bgcolor: "white",
                    zIndex: "1",
                  }}
                >
                  <Typography component="span">Category</Typography>
                </AccordionSummary>{" "}
                <AccordionDetails>
                  <Stack spacing={1}>
                    {category &&
                      category.map((option) => (
                        <Chip
                          key={option.name}
                          label={option.name}
                          variant={
                            tempSelectedCategory === option.name
                              ? "filled"
                              : "outlined"
                          }
                          color={
                            tempSelectedCategory === option.name
                              ? "warning"
                              : "default"
                          }
                          onClick={() => {
                            setTempSelectedCategory(option.name);
                          }}
                          sx={{
                            justifyContent: "flex-start",
                            "&:hover": {
                              bgcolor:
                                tempSelectedCategory === option.name
                                  ? "#ED6C02.dark"
                                  : "#f5f5f5",
                            },
                          }}
                        />
                      ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
              <Accordion
                square={true}
                sx={{
                  boxShadow: "none",
                  maxHeight: "500px",
                  overflow: "auto",
                  position: "relative",
                  top: "0",
                  "&::-webkit-scrollbar": {
                    width: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    position: "sticky",
                    top: "0",
                    bgcolor: "white",
                  }}
                >
                  <Typography component="span">Price</Typography>
                </AccordionSummary>{" "}
                <AccordionDetails>
                  <Stack spacing={1}>
                    {[
                      { value: "default", label: "Default" },
                      { value: "low-high", label: "Low → High" },
                      { value: "high-low", label: "High → Low" },
                    ].map((option) => (
                      <Chip
                        key={option.value}
                        label={option.label}
                        variant={
                          tempSortBy === option.value ? "filled" : "outlined"
                        }
                        color={
                          tempSortBy === option.value ? "warning" : "default"
                        }
                        onClick={() => setTempSortBy(option.value)}
                        sx={{
                          justifyContent: "flex-start",
                          "&:hover": {
                            bgcolor:
                              tempSortBy === option.value
                                ? "#ED6C02.dark"
                                : "#f5f5f5",
                          },
                        }}
                      />
                    ))}
                  </Stack>{" "}
                </AccordionDetails>
              </Accordion>{" "}
              {/* Apply Filters และ Reset Buttons */}
              <Box
                sx={{
                  position: "relative",
                  mt: 3,
                  display: "flex",
                  gap: 1,
                  flexDirection: "column",
                  bgcolor: "white",
                }}
              >
                {searchTerm ? (
                  // แสดงปุ่ม Clear Search เมื่อมีการค้นหา
                  <button
                    onClick={() => {
                      window.history.pushState({}, "", "/shop");
                      window.location.reload();
                    }}
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "25px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = "#d32f2f";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = "#f44336";
                    }}
                  >
                    Clear Search
                  </button>
                ) : (
                  // แสดงปุ่ม Apply และ Reset เมื่อไม่มีการค้นหา
                  <>
                    <button
                      onClick={applyFilters}
                      style={{
                        padding: "12px 24px",
                        backgroundColor: "#ED6C02",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#D84315";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#ED6C02";
                      }}
                    >
                      Apply Filters
                    </button>

                    <button
                      onClick={resetFilters}
                      style={{
                        padding: "12px 24px",
                        backgroundColor: "white",
                        color: "#666",
                        border: "1px solid #ddd",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      Reset Filters
                    </button>
                  </>
                )}{" "}
              </Box>
            </Box>
          </Grid>
        )}

        {/* Mobile Filter Drawer */}
        {isMobile && (
          <Drawer
            anchor="bottom"
            open={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
            PaperProps={{
              sx: {
                maxHeight: "80vh",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Filters
                </Typography>
                <IconButton onClick={() => setMobileFilterOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Accordion
                square={true}
                sx={{
                  boxShadow: "none",
                  maxHeight: "300px",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    position: "sticky",
                    top: "0",
                    bgcolor: "white",
                    zIndex: "1",
                  }}
                >
                  <Typography component="span">Category</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    {category &&
                      category.map((option) => (
                        <Chip
                          key={option.name}
                          label={option.name}
                          variant={
                            tempSelectedCategory === option.name
                              ? "filled"
                              : "outlined"
                          }
                          color={
                            tempSelectedCategory === option.name
                              ? "warning"
                              : "default"
                          }
                          onClick={() => {
                            setTempSelectedCategory(option.name);
                          }}
                          sx={{
                            justifyContent: "flex-start",
                            "&:hover": {
                              bgcolor:
                                tempSelectedCategory === option.name
                                  ? "#ED6C02.dark"
                                  : "#f5f5f5",
                            },
                          }}
                        />
                      ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion
                square={true}
                sx={{
                  boxShadow: "none",
                  maxHeight: "300px",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  sx={{
                    position: "sticky",
                    top: "0",
                    bgcolor: "white",
                  }}
                >
                  <Typography component="span">Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1}>
                    {[
                      { value: "default", label: "Default" },
                      { value: "low-high", label: "Low → High" },
                      { value: "high-low", label: "High → Low" },
                    ].map((option) => (
                      <Chip
                        key={option.value}
                        label={option.label}
                        variant={
                          tempSortBy === option.value ? "filled" : "outlined"
                        }
                        color={
                          tempSortBy === option.value ? "warning" : "default"
                        }
                        onClick={() => setTempSortBy(option.value)}
                        sx={{
                          justifyContent: "flex-start",
                          "&:hover": {
                            bgcolor:
                              tempSortBy === option.value
                                ? "#ED6C02.dark"
                                : "#f5f5f5",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Box
                sx={{ mt: 3, display: "flex", gap: 1, flexDirection: "column" }}
              >
                {searchTerm ? (
                  <button
                    onClick={() => {
                      window.history.pushState({}, "", "/shop");
                      window.location.reload();
                    }}
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "25px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Clear Search
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        applyFilters();
                        setMobileFilterOpen(false);
                      }}
                      style={{
                        padding: "12px 24px",
                        backgroundColor: "#ED6C02",
                        color: "white",
                        border: "none",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Apply Filters
                    </button>
                    <button
                      onClick={() => {
                        resetFilters();
                        setMobileFilterOpen(false);
                      }}
                      style={{
                        padding: "12px 24px",
                        backgroundColor: "white",
                        color: "#666",
                        border: "1px solid #ddd",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      Reset Filters
                    </button>
                  </>
                )}
              </Box>
            </Box>
          </Drawer>
        )}

        <Grid size={{ xs: 12, md: isMobile ? 12 : 8, lg: 9 }}>
          {" "}
          {/* Filter Status Display */}
          <Box
            sx={{
              mb: 2,
              p: { xs: 1, md: 2 },
              bgcolor: "#f9f9f9",
              borderRadius: "10px",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              <strong>
                {searchTerm
                  ? `Search Results for: "${searchTerm}"`
                  : "Active Filters:"}
              </strong>
              {!searchTerm && appliedCategory !== "mens-shirts" && (
                <span
                  style={{
                    marginLeft: "8px",
                    padding: "4px 8px",
                    backgroundColor: "#ED6C02",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  {appliedCategory}
                </span>
              )}
              {!searchTerm && appliedSortBy !== "default" && (
                <span
                  style={{
                    marginLeft: "8px",
                    padding: "4px 8px",
                    backgroundColor: "#1976d2",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  Sort:{" "}
                  {appliedSortBy === "low-high"
                    ? "Low → High"
                    : appliedSortBy === "high-low"
                    ? "High → Low"
                    : appliedSortBy}
                </span>
              )}
              {!searchTerm &&
                appliedCategory === "mens-shirts" &&
                appliedSortBy === "default" && (
                  <span style={{ marginLeft: "8px", color: "#666" }}>
                    No filters applied
                  </span>
                )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Showing {displayProducts.length} products
            </Typography>
          </Box>{" "}
          <Grid container spacing={{ xs: 1, md: 2 }}>
            {displayProducts &&
              displayProducts.map((product, index) => (
                <Grid
                  size={{ xs: 6, sm: 4, md: 6, lg: 4 }}
                  key={product.id || index}
                  sx={{
                    display: "block",
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    padding: { xs: "5px", md: "10px" },
                    "&:hover": {
                      transform: { xs: "none", md: "translateY(-8px)" },
                      boxShadow: {
                        xs: "none",
                        md: "0 8px 25px rgba(0,0,0,0.15)",
                      },
                    },
                  }}
                >
                  <MuiLink
                    component={RouterLink}
                    to={`/shop/products/${product.id}`}
                    underline="none"
                    color="inherit"
                  >
                    {" "}
                    <CardMedia
                      component="img"
                      title={product.title}
                      alt={product.title}
                      image={product.thumbnail}
                      sx={{
                        height: { xs: "180px", md: "250px" },
                        width: "90%",
                        objectFit: "contain",
                        mx: "auto",
                        borderRadius: { xs: "15px", md: "25px" },
                        display: "block",
                        bgcolor: "#F0EEED",
                      }}
                    />{" "}
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      my={{ xs: 1, md: 2 }}
                      sx={{
                        fontSize: { xs: "0.9rem", md: "1.25rem" },
                        lineHeight: { xs: 1.3, md: 1.6 },
                      }}
                    >
                      {product.title}
                    </Typography>{" "}
                    <Stack
                      spacing={{ xs: 0.5, md: 1 }}
                      direction="row"
                      sx={{ mb: { xs: 1, md: 0 } }}
                    >
                      {" "}
                      <Rating
                        component="span"
                        name="rating"
                        defaultValue={product.rating || 0}
                        precision={0.5}
                        readOnly
                        sx={{
                          fontSize: { xs: "1rem", md: "1.5rem" },
                        }}
                      />
                      <Typography
                        variant="body2"
                        alignSelf="center"
                        sx={{
                          fontSize: { xs: "0.75rem", md: "0.875rem" },
                        }}
                      >
                        {product.rating || 0}/5
                      </Typography>
                    </Stack>{" "}
                    <Box
                      px={{ xs: 0, md: 1 }}
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: { xs: 0.5, sm: 0 },
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                          my: { xs: 1, md: 2 },
                          fontSize: { xs: "1rem", md: "1.25rem" },
                        }}
                      >
                        ${product.price}
                      </Typography>
                      {product.discountPercentage &&
                      product.discountPercentage > 0 ? (
                        <Typography
                          bgcolor="#FFEBEB"
                          color="red"
                          sx={{
                            borderRadius: { xs: "15px", md: "25px" },
                            p: { xs: "4px 8px", md: "8px 15px" },
                            marginLeft: { xs: 0, sm: "20px" },
                            fontSize: { xs: "0.75rem", md: "0.875rem" },
                          }}
                        >
                          -{Math.round(product.discountPercentage)}%
                        </Typography>
                      ) : null}
                    </Box>
                  </MuiLink>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShopPage;
