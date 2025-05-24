// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AntdProvider from "./providers/AntdRegistry";
import theme from "../styles/theme";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Providers from "./providers"
import "./font.css";
import "./globals.css";


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
      <body>
        <Providers>

          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID} >
            <AntdProvider>
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
           {children}

            </AntdProvider>
          </GoogleOAuthProvider>

        </Providers>

      </body>
    </html>
  );
}
