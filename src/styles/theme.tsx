import { extendTheme } from "@chakra-ui/react";
import { Button } from "../components/Button";

const theme = extendTheme({
  fonts: {
    heading: "Lexend, sans-serif",
    body: "Inter, sans-serif",
  },
  fontSizes: {
    h1: "2.75rem",
    h2: "2.25rem",
    h3: "2rem",
    h4: "1.75rem",
    h5: "1.5rem",
    h6: "1.25rem",
    h7: "1rem",
    b1: "1rem",
    b2: "0.875rem",
  },
  colors: {
    brand: {
      1: "#4529E6",
      2: "#5126EA",
      3: "#B0A6F0",
      4: "#EDEAFD",
    },
    grey: {
      0: "#0B0D0D",
      1: "#212529",
      2: "#495057",
      3: "#868E96",
      4: "#ADB5BD",
      5: "#CED4DA",
      6: "#DEE2E6",
      7: "#E9ECEF",
      8: "#F1F3F5",
      9: "#F8F9FA",
      10: "#FDFDFD",
      white: "#FFFFFF",
    },
    alert: {
      1: "#CD2B31",
      2: "#FDD8D8",
      3: "#FFE5E5",
    },
    sucess: {
      1: "#18794E",
      2: "#CCEBD7",
      3: "#DDF3E4",
    },
    random: {
      1: "#E34D8C",
      2: "#C04277",
      3: "#7D2A4D",
      4: "#7000FF",
      5: "#6200E3",
      6: "#36007D",
      7: "#349974",
      8: "#2A7D5F",
      9: "#153D2E",
      10: "#6100FF",
      11: "#5700E3",
      12: "#30007D",
    },
  },
  components: {
    Button,
  },
});

export default theme;
