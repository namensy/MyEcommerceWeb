import { createTheme, styled } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily:
      '"Prompt", "Unbounded Variable", "Roboto", "Helvetica", "Arial", "sans-serif"',
    h3: {
      fontWeight: 900,
    },
  },
});

export default theme;

export const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  padding: theme.spacing(1),
}));
