import { Col, Layout, Row, Typography } from "antd";
const { Content } = Layout;
import React, { useContext } from "react";
import HeaderLayout from "./header";
import SiderLayout from "./sider";
import style from "./style.module.css";
import { useRouter } from "next/router";
import { useWindowSize } from "./user_avatar";
import { COLLAPSED_MENU_LAYOUT } from "@/contexts/collapsed";

export default function LayoutInterno({ children }: any) {
  const { collapsed } = useContext(COLLAPSED_MENU_LAYOUT);
  const router = useRouter();
  const size = useWindowSize();

  return (
    <Layout>
      <SiderLayout />
      <Layout
        id="main_page"
        style={{
          marginLeft:
            size.width <= 820 ? (!collapsed ? 0 : 250) : !collapsed ? 80 : 250,
          background: "#F8F8F8",
          overflowX: "hidden",
        }}
      >
        <div
          className={`${style.contenido_layout}`}
        >
          <HeaderLayout />

          <div style={{ margin: "0px 0px 10px 10px", fontSize: 21 }}>
            <Row>
              <Typography.Title
                level={3}
                style={{ color: "#636363", paddingRight: "1rem" }}
              >
                Shipments
              </Typography.Title>
            </Row>
          </div>
          <Content
            style={{
              background: "#F8F8F8",
            }}
          >
            <div
              style={{
                padding: 12,
                margin: 0,
                minHeight: 280,
                boxShadow: "0 4px 24px 0 rgba(34, 41, 47, 0.1)",
                background: "white",
                borderRadius: 15,
              }}
            >
              <Col>{children}</Col>
            </div>
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}
