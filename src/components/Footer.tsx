import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Email as EmailIcons } from "@mui/icons-material";
import { footerData } from "../data/footer";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box position="relative" bgcolor="#F0F0F0" sx={{ mt: { xs: 10, md: 20 } }}>
      {/* Newsletter Section */}
      <Box
        position="absolute"
        sx={{
          bottom: 0,
          top: { xs: -100, sm: -120, md: -130 },
          right: 0,
          left: 0,
          height: { xs: "240px", sm: "280px", md: "260px" },
          maxWidth: "xl",
          margin: { xs: "0 16px", md: "0 auto" },
          bgcolor: "black",
          borderRadius: { xs: "20px", md: "30px" },
          p: { xs: 2, md: 4 },
        }}
      >
        <Grid container columns={12} sx={{ height: { xs: "45%", md: "100%" } }}>
          <Grid
            size={{ xs: 12, md: 7 }}
            sx={{
              height: "100%",
              px: { xs: 2, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              color="white"
              fontWeight={600}
              textTransform="uppercase"
              fontFamily="Unbounded Variable, sans-serif"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                },
                lineHeight: 1.2,
                mb: { xs: 2, md: 0 },
              }}
            >
              Stay up to date about our latest offers
            </Typography>
          </Grid>

          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              px: { xs: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: { xs: 1.5, md: 2 },
            }}
          >
            <TextField
              placeholder="Enter your email address"
              variant="outlined"
              fullWidth
              type="email"
              size={isMobile ? "small" : "medium"}
              sx={{
                maxWidth: "500px",
                bgcolor: "white",
                borderRadius: "50px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                  "& fieldset": {
                    border: "none",
                  },
                  "&:hover fieldset": {
                    border: "2px solid #e0e0e0",
                  },
                  "&.Mui-focused fieldset": {
                    border: "2px solid rgb(243, 159, 33)",
                    boxShadow: "0 0 0 3px rgba(218, 121, 32, 0.87)",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: { xs: "12px 16px", md: "16px 20px" },
                  fontSize: { xs: "14px", md: "16px" },
                  "&::placeholder": {
                    color: "#999",
                    opacity: 1,
                  },
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcons
                        sx={{
                          color: "#999",
                          fontSize: { xs: "18px", md: "20px" },
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                maxWidth: "500px",
                bgcolor: "white",
                color: "black",
                borderRadius: "50px",
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Subscribe to Newsletter
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Content */}
      <Container maxWidth="xl">
        <Grid
          container
          spacing={{ xs: 4, sm: 6, md: 8 }}
          sx={{
            pt: { xs: "140px", sm: "160px", md: "150px" },
            pb: { xs: 4, md: 6 },
            px: { xs: 2, md: 0 },
          }}
        >
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h3"
              textTransform="uppercase"
              fontFamily="Unbounded Variable, sans-serif"
              sx={{
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                mb: { xs: 2, md: 4 },
                fontWeight: "bold",
              }}
            >
              Dove.co
            </Typography>
            <Typography
              variant="body1"
              color="#7A6969"
              sx={{
                maxWidth: "340px",
                fontSize: { xs: "14px", md: "16px" },
                lineHeight: 1.6,
              }}
            >
              We have clothes that suits your style and which you're proud to
              wear. From women to men
            </Typography>
          </Grid>

          {/* Footer Links */}
          {footerData &&
            footerData.map((data, index) => (
              <Grid
                size={{ xs: 6, sm: 4, md: 2 }}
                key={index}
                sx={{ mb: { xs: 2, md: 0 } }}
              >
                <Typography
                  variant="body1"
                  fontWeight={700}
                  letterSpacing={1}
                  textTransform="uppercase"
                  sx={{
                    mb: { xs: 2, md: 4 },
                    fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  }}
                >
                  {data.title}
                </Typography>
                {data.links &&
                  data.links.map((item, linkIndex) => (
                    <Typography
                      key={linkIndex}
                      variant="body1"
                      color="#7A6969"
                      sx={{
                        mb: { xs: 1, md: 2 },
                        fontSize: { xs: "12px", sm: "14px", md: "16px" },
                        cursor: "pointer",
                        transition: "color 0.2s ease",
                        "&:hover": {
                          color: "#333",
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  ))}
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
