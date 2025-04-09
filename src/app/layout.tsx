// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./providers/AntdRegistry";
import { ConfigProvider } from "antd";
import theme from "../styles/theme";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Providers from "./providers"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial'], // Fallback fonts
})
export const metadata: Metadata = {
  title: "payBeam",
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
        <Providers>

          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} >
            <StyledComponentsRegistry>
              <Toaster toastOptions={{
                className: "",
                style: {
                  border: `1px solid #AC6AFF`,
                  padding: "16px",
                  color: "#AC6AFF",
                  backgroundColor: "#FFC876",
                  borderRadius: "8px",
                  fontFamily: "Arial, sans-serif",
                },
              }} />
              <ConfigProvider theme={theme}>{children}</ConfigProvider>

            </StyledComponentsRegistry>
          </GoogleOAuthProvider>

        </Providers>

      </body>
    </html>
  );
}
