// app/components/DashboardLayout.tsx
import { Layout, Menu } from "antd";
import { HomeOutlined, FileTextOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Header, Content, Sider } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh", background: "#2C120D" }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link href="/invoices">Invoices</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: "#561D1D" }} />
        <Content style={{ margin: "16px", background: "#2C120D" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "#3D1A1A",
              borderRadius: 8,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
