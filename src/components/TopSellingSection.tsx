import { topSelling } from "../data/products";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink, useMediaQuery, useTheme } from "@mui/material";
import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
  Container,
} from "@mui/material";

const TopSellingSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
      <Box>
        <Typography
          variant="h3"
          color="initial"
          fontWeight="700"
          fontFamily='"Unbounded Variable", sans-serif'
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            my: { xs: 4, md: 6 },
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Top Selling
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            mb: { xs: 4, md: 6 },
          }}
        >
          {topSelling &&
            topSelling.map((products, index) => (
              <Grid
                size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    p: { xs: 1, md: 2 },
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      mb: { xs: 1.5, md: 2 },
                      overflow: "hidden",
                      borderRadius: 2,
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <CardMedia
                      component="img"
                      title={`${products.name} Logo`}
                      alt={`${products.name} Brand Logo`}
                      image={products.image}
                      sx={{
                        height: { xs: "140px", sm: "180px", md: "220px" },
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      sx={{
                        fontSize: {
                          xs: "0.875rem",
                          sm: "1rem",
                          md: "1.125rem",
                        },
                        mb: { xs: 1, md: 1.5 },
                        lineHeight: 1.3,
                        minHeight: { xs: "2.6em", md: "3em" },
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {products.name}
                    </Typography>

                    <Stack
                      spacing={1}
                      direction="row"
                      sx={{
                        mb: { xs: 1, md: 1.5 },
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        component="span"
                        name="half-rating"
                        defaultValue={products.rating}
                        precision={0.5}
                        readOnly
                        size={isMobile ? "small" : "medium"}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.75rem", md: "0.875rem" },
                          color: "text.secondary",
                        }}
                      >
                        {products.rating}/5
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: "center",
                        mt: "auto",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{
                          fontSize: { xs: "1rem", md: "1.25rem" },
                          color: "black",
                        }}
                      >
                        ${products.price}
                      </Typography>
                      {products.discount && (
                        <Typography
                          sx={{
                            bgcolor: "#ffebee",
                            color: "#d32f2f",
                            borderRadius: "12px",
                            px: { xs: 1, md: 1.5 },
                            py: 0.5,
                            fontSize: { xs: "0.7rem", md: "0.8rem" },
                            fontWeight: "600",
                          }}
                        >
                          -{products.discount}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: { xs: 3, md: 4 } }}>
          <MuiLink component={RouterLink} to="/shop">
            <Button
              aria-label="View all products"
              sx={{
                bgcolor: "transparent",
                color: "black",
                border: "2px solid black",
                px: { xs: 4, sm: 6, md: 8 },
                py: { xs: 1.5, md: 2 },
                borderRadius: "50px",
                textTransform: "none",
                letterSpacing: "0.7px",
                fontSize: { xs: "14px", sm: "16px", md: "18px" },
                mb: { xs: 4, md: 6 },
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "black",
                  color: "white",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                },
              }}
            >
              View All Products
            </Button>
          </MuiLink>

          <Divider
            sx={{
              mb: { xs: 4, md: 6 },
              mx: "auto",
              maxWidth: "1200px",
              background:
                "linear-gradient(90deg, transparent 0%, #ccc 50%, transparent 100%)",
              height: "1px",
              border: "none",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default TopSellingSection;
