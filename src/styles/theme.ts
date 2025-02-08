// app/theme.ts
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#561D1D", // Dark reddish-brown
    colorPrimaryBg: "#3D1A1A", // Deeper shade of brown
    colorPrimaryBorder: "#A37575", // Light brown with a reddish tint
    colorPrimaryHover: "#D9B7B7", // Soft tan
    colorBgBase: "#2C120D", // Dark background for content
    colorTextBase: "#E0E0E0", // Light gray text for contrast
    colorBorder: "#6E3B3B", // Reddish-brown border
    colorBgContainer: "#3D1A1A", // Background for cards and containers
    colorText: "#E0E0E0", // Text color for cards
  },
  components: {
    Layout: {
      headerBg: "#561D1D", // Dark reddish-brown for header
      siderBg: "#3D1A1A", // Deeper shade of brown for sidebar
      bodyBg: "#2C120D", // Dark background for content
    },
    Card: {
      colorBgContainer: "#3D1A1A", // Background for cards
      colorText: "#E0E0E0", // Text color for cards
    },
    Menu: {
      itemBg: "#3D1A1A", // Background for menu items
      itemColor: "#E0E0E0", // Text color for menu items
      itemHoverBg: "#561D1D", // Hover background for menu items
      itemSelectedBg: "#561D1D", // Selected background for menu items
      itemSelectedColor: "#E0E0E0", // Selected text color for menu items
    },
  },
};

export default theme;
