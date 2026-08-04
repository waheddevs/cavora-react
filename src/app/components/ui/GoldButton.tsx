import { styled } from "@mui/material/styles"
import MuiButton from "@mui/material/Button"

const GoldButton = styled(MuiButton)(() => ({
  position: "relative",
  overflow: "hidden",
  border: "1.7px solid #FFB300",
  backgroundColor: "#ffffff",
  color: "#FFB300",
  textTransform: "capitalize",
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 500,
  letterSpacing: "0.4px",
  borderRadius: "8px",
  padding: "7px 22px",
  fontSize: "14px",
  boxShadow: "none",
  zIndex: 0,
  transition: "color 0.35s ease",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "0%",
    backgroundColor: "#FFB300",
    transition: "width 0.35s ease",
    zIndex: -1,
  },

  "& .MuiButton-startIcon, & .MuiButton-endIcon": {
    position: "relative",
    zIndex: 1,
  },

  "& .MuiTouchRipple-root": {
    zIndex: 2,
  },

  "&:hover": {
    border: "1.5px solid #FFB300",
    backgroundColor: "transparent",
    color: "#ffffff",
    boxShadow: "none",

    "&::before": {
      width: "100%",
    },
  },

  "&:active": {
    boxShadow: "none",
    "&::before": {
      backgroundColor: "#E6A200",
    },
  },

  "&.Mui-disabled": {
    border: "1.5px solid #FFD54F",
    color: "#FFD54F",
    backgroundColor: "#ffffff",
  },
})) as typeof MuiButton

export default GoldButton
