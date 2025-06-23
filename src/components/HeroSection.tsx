import {
  Box,
  Button,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ShoppingBag as ShoppingBagIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import CountUp from "react-countup";

type Props = {};

export default function HeroSection({}: Props) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const size = isMdUp ? 6 : 12;
  return (
    <>
      <Box sx={{ bgcolor: "#F2F0F1" }}>
        {" "}
        <Grid
          container
          maxWidth="xl"
          margin="0 auto"
          columns={12}
          spacing={{ xs: 3, md: 6 }}
          sx={{
            minHeight: { xs: "600px", sm: "700px", md: "800px" },
            overflow: "hidden",
            py: { xs: 6, md: 10 },
            px: { xs: 2, md: 0 },
          }}
        >
          <Grid size={size} sx={{ px: { xs: 0, md: 2.5 } }}>
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
                fontSize: { xs: "1rem", md: "1.2rem" },
                lineHeight: 1.6,
                my: { xs: 2, md: 4 },
                mb: 8,
                maxWidth: "700px",
              }}
            >
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </Typography>
            <MuiLink component={RouterLink} to="/shop">
              <Button
                startIcon={<ShoppingBagIcon />}
                aria-label="Shop now for clothes"
                sx={{
                  bgcolor: "grey.900",
                  px: { xs: 18, md: 8 },
                  py: { xs: 1.5, md: 2 },
                  color: "white",
                  borderRadius: "50px",
                  textTransform: "none",
                  letterSpacing: "1px",
                  fontSize: { xs: "18px", md: "24px" },
                  mb: "2em",
                  ml: "0.2em",
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
            </MuiLink>{" "}
            <Grid
              container
              spacing={{ xs: 3, md: 6 }}
              columns={12}
              sx={{ mt: { xs: 4, md: 6 } }}
            >
              <Grid size={{ xs: 6, md: 4 }}>
                <Box
                  sx={{
                    borderRight: {
                      xs: "1px solid #e0e0e0",
                      md: "2px solid grey",
                    },
                    pr: { xs: 2, md: 3 },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }}
                  >
                    <CountUp end={200} duration={5} />+
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    International Brands
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <Box
                  sx={{
                    borderRight: { xs: "none", md: "2px solid grey" },
                    pr: { xs: 0, md: 3 },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }}
                  >
                    <CountUp end={2000} duration={5} />+
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    High-Quality Products
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" } }}
                  >
                    <CountUp end={30000} duration={5} />+
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                  >
                    Happy Customers
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={size}>
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
              <MuiLink component={RouterLink} to="/shop">
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
              </MuiLink>
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
        {" "}
        <Grid
          container
          columns={10}
          maxWidth="xl"
          margin="0 auto"
          spacing={{ xs: 2, sm: 4, md: 10 }}
          sx={{ px: { xs: 2, md: 0 } }}
        >
          {[
            { name: "Versace", src: "/images/Versace.png" },
            { name: "Gucci", src: "/images/Gucci.png" },
            { name: "Prada", src: "/images/Prada.png" },
            { name: "Calvin Klein", src: "/images/Calvin.png" },
            { name: "Zara", src: "/images/Zara.png" },
          ].map((brand, index) => (
            <Grid size={{ xs: 2 }} key={index}>
              <CardMedia
                component="img"
                title={`${brand.name} Logo`}
                alt={`${brand.name} Brand Logo`}
                image={brand.src}
                sx={{
                  height: { xs: "20px", sm: "25px", md: "30px" },
                  width: { xs: "60px", sm: "70px", md: "auto" },
                  objectFit: "contain",
                  mx: "auto",
                  filter: "brightness(0) invert(1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                    filter: "brightness(0) invert(0.8)",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
