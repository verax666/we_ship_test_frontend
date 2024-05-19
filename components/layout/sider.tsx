import {
  Menu,
  Layout,
  Row,
  Typography,
  Image,
  Col,
  MenuProps,
  Divider,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { TruckOutlined } from "@ant-design/icons";
import { useWindowSize } from "./user_avatar";
import { COLLAPSED_MENU_LAYOUT } from "@/contexts/collapsed";
import { useRouter } from "next/router";

export default function SiderLayout() {
  const router = useRouter();
  const { collapsed, setCollapsed } = useContext(COLLAPSED_MENU_LAYOUT);
  const size = useWindowSize();

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    onClick?: Function,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
      onClick,
    } as MenuItem;
  }

  useEffect(() => {}, []);

  type MenuItem = Required<MenuProps>["items"][number];

  return (
    <Layout.Sider
      width={250}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "white",
        // boxShadow: "1px 2px 3px 2px #888888",
      }}
      id={"sider-ly"}
      trigger={null}
      collapsible
      collapsedWidth={size?.width > 820 ? 80 : 0}
      collapsed={!collapsed}
    >
      <Row style={{ backgroundColor: "white", padding: 10 }} justify={"center"}>
        <Image preview={false} src="https://assets-global.website-files.com/6210259c8729036c3fdccb2d/6226860b84a75d441cad78f7_Logo-WeShip-Landing-Azulv2.png" />
        <Divider style={{ margin: "10px 0px" }} />
      </Row>
      <Menu
        mode="inline"
        defaultSelectedKeys={[router.asPath]}
        style={{ color: "#6e6b7b", fontWeight: "bold" }}
        items={[
          getItem(
            "Shipments",
            `shipments`,
            () => {},
            <TruckOutlined />
          ),
        ]}
      />
      <div
        style={{
          background: "#F8F8F8",
          position: "relative",
          padding: "15px",
          bottom: 0,
          right: 0,
          color: "black",
        }}
      >
         Demo
      </div>
    </Layout.Sider>
  );
}
