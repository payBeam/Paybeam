// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./providers/AntdRegistry";
import { ConfigProvider } from "antd";
import theme from "../styles/theme";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "@/Context"

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "PayBeam",
  description: "A seamless platform to automate, split, and manage payments with security and transparency.",
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
          <UserContextProvider>
            <Toaster />
            <ConfigProvider theme={theme}>{children}</ConfigProvider>
          </UserContextProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
