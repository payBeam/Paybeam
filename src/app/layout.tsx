// app/layout.tsx
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./font.css";
import "./globals.css";
import Providers from "./providers";
import AntdProvider from "./providers/AntdRegistry";

export const metadata: Metadata = {
  title: "payBeam",
  description:
    "A seamless platform to automate, split, and manage payments with security and transparency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Providers>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            <AntdProvider>
              <Toaster
                toastOptions={{
                  className: "",
                  style: {
                    border: `1px solid #AC6AFF`,
                    padding: "16px",
                    color: "#AC6AFF",
                    backgroundColor: "#FFC876",
                    borderRadius: "8px",
                    fontFamily: "Arial, sans-serif",
                  },
                }}
              />
              {children}
            </AntdProvider>
          </GoogleOAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
