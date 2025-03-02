import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#007BFF", // Electric Blue
    colorPrimaryBg: "#0056b3", // Darker Blue for backgrounds
    colorPrimaryBorder: "#1E88E5", // Deep Electric Blue for borders
    colorPrimaryHover: "#1E88E5", // Hover effect with darker blue
    colorBgBase: "#0A1F44", // Dark navy background for contrast
    colorTextBase: "#E0E0E0", // Light gray text for readability
    colorBorder: "#1E88E5", // Blue border for a sleek effect
    colorBgContainer: "#0F254E", // Deep blue background for cards
    colorText: "#E0E0E0", // White/light text for contrast
  },
  components: {
    Layout: {
      headerBg: "#0056b3", // Dark Electric Blue for header
      siderBg: "#0A1F44", // Dark navy for sidebar
      bodyBg: "#0F254E", // Deep blue background for content
    },
    Card: {
      colorBgContainer: "#0F254E", // Deep blue background for cards
      colorText: "#E0E0E0", // White/light text for contrast
    },
    Menu: {
      itemBg: "#0A1F44", // Dark navy background for menu items
      itemColor: "#E0E0E0", // Light text for visibility
      itemHoverBg: "#1E88E5", // Hover background with deep blue
      itemSelectedBg: "#007BFF", // Bright Electric Blue for selected items
      itemSelectedColor: "#FFFFFF", // White text for selected items
    },
  },
};

export default theme;
