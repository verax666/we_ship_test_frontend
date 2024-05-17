import { Col, Row, Typography, Layout } from "antd";
const { Header } = Layout;

import { createElement, useContext } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import UserAvatar, { useWindowSize } from "./user_avatar";
import { COLLAPSED_MENU_LAYOUT } from "@/contexts/collapsed";

export default function HeaderLayout() {
  const { collapsed, setCollapsed } = useContext(COLLAPSED_MENU_LAYOUT);
  const size = useWindowSize();

  return (
    <Header
      style={{
        height: 80,
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        margin: "auto",
        width: "100%",
        // maxWidth: 1340,
        background: "white",
        boxShadow: "0 4px 24px 0 rgba(34, 41, 47, 0.1)",
        paddingInline: 25,
        marginBottom: 20,
      
      }}
    >
      <Row
        justify="space-between"
        style={{ width: "100%", border: "#F2F2FD" }}
        align={"middle"}
      >
        <Col span={size.width <= 820 ? 18 : 12}>
          <Typography.Text
            ellipsis
            style={{
              fontSize: 18,
              fontWeight: "bold",
              verticalAlign: "middle",
            }}
          >
            {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            })}
          </Typography.Text>
        </Col>
        <Col className="avatar-hide" span={size.width <= 820 ? 6 : 12}>
          <UserAvatar />
        </Col>
      </Row>
    </Header>
  );
}
