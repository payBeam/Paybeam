// app/providers/AntdRegistry.tsx
"use client";

import React from "react";
// import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
// import type Entity from "@ant-design/cssinjs/es/Cache";
// import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useClient } from "@/Context/index";
import { AntdRegistry } from "@ant-design/nextjs-registry";

function AntdProvider({ children }: { children: React.ReactNode }) {
  const { darkAlgorithm, defaultAlgorithm } = antdTheme;
  const { isDarkMode } = useClient();

  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}

export default AntdProvider;
