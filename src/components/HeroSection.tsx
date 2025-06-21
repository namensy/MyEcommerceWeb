import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import { ShoppingBag as ShoppingBagIcon } from "@mui/icons-material";
import CountUp from "react-countup";

type Props = {};

export default function HeroSection({}: Props) {
  return (
    <>
      <Box sx={{ bgcolor: "#F2F0F1" }}>
        <Grid
          container
          maxWidth="xl"
          margin="0 auto"
          columns={12}
          spacing={6}
          sx={{ minHeight: "800px", overflow: "hidden", py: 10 }}
        >
          <Grid size={6} padding="0">
            <Typography
              variant="h3"
              color="text.primary"
              fontWeight="900"
              fontFamily='"Unbounded Variable", sans-serif'
              textTransform="uppercase"
              sx={{
                fontSize: { xs: "2.5rem", md: "68px" },
                lineHeight: 1.2,
                maxWidth: "800px",
              }}
            >
              Find clothes that matches your style
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontSize: "1.2rem",
                lineHeight: 1.6,
                my: 4,
                mb: 8,
                maxWidth: "700px",
              }}
            >
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </Typography>

            <Button
              startIcon={<ShoppingBagIcon />}
              aria-label="Shop now for clothes"
              sx={{
                bgcolor: "grey.900",
                px: { xs: 4, md: 8 },
                py: { xs: 1.5, md: 2 },
                color: "white",
                borderRadius: "50px",
                textTransform: "none",
                letterSpacing: "1px",
                fontSize: { xs: "18px", md: "24px" },
                mb: "2em",
                "&:hover": {
                  bgcolor: "black",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
                "&:focus": {
                  outline: "2px solid rgba(56, 28, 1, 0.77)",
                  outlineOffset: "2px",
                },
              }}
            >
              Shop Now
            </Button>
            <Grid container spacing={6} columns={12} sx={{ mt: 6 }}>
              <Grid size={4}>
                <Box sx={{ borderRight: "2px solid grey" }}>
                  <Typography variant="h4" fontWeight="bold" fontSize="3rem">
                    <CountUp end={200} duration={5} />+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    International Brands
                  </Typography>
                </Box>
              </Grid>
              <Grid size={4}>
                <Box sx={{ borderRight: "2px solid grey" }}>
                  <Typography variant="h4" fontWeight="bold" fontSize="3rem">
                    <CountUp end={2000} duration={5} />+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    High-Quality Products
                  </Typography>
                </Box>
              </Grid>
              <Grid size={4}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" fontSize="3rem">
                    <CountUp end={30000} duration={5} />+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Happy Customers
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "600px",
                height: { xs: "300px", md: "600px" },
                overflow: "hidden",
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                "&:hover": {
                  transform: "scale(0.95) rotate(-1deg)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
                },
                "&:hover .image-content": {
                  transform: "scale(1.2)",
                },
                "&:hover .overlay": {
                  opacity: 1,
                },
              }}
            >
              <CardMedia
                component="img"
                image="/images/BoyAndGirl.png"
                alt="Fashion clothing collection"
                className="image-content"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  color="white"
                  fontWeight="bold"
                  sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                >
                  View Collection
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          bgcolor: "black",
          py: 4,
        }}
      >
        <Grid container columns={10} maxWidth="xl" margin="0 auto" spacing={10}>
          {[
            { name: "Versace", src: "/images/Versace.png" },
            { name: "Gucci", src: "/images/Gucci.png" },
            { name: "Prada", src: "/images/Prada.png" },
            { name: "Calvin Klein", src: "/images/Calvin.png" },
            { name: "Zara", src: "/images/Zara.png" },
          ].map((brand, index) => (
            <Grid size={2} key={index}>
              <CardMedia
                component="img"
                title={`${brand.name} Logo`}
                alt={`${brand.name} Brand Logo`}
                image={brand.src}
                sx={{
                  height: "30px",
                  width: "auto",
                  objectFit: "contain",
                  mx: "auto",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
