// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./providers/AntdRegistry";
import { ConfigProvider } from "antd";
import theme from "../styles/theme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayBeam Dashboard",
  description: "Dashboard for managing payments and invoices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
