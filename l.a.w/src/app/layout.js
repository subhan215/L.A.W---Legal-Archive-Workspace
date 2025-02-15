import React from "react";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
