import { Avatar, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    }

    // Add event listener
    window?.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window?.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default function UserAvatar() {
  const size = useWindowSize();

  return (
    <Row justify={size?.width > 820 ? "end" : "center"} align={"middle"}>
      {/* <Col span={10} /> */}

      <Row
        style={{ height: 80, lineHeight: 1, marginRight: 10 }}
        justify={"center"}
        align={"middle"}
      >
        <span
          style={{
            fontWeight: "bold",
            width: "100%",
            fontSize: 15,
            color: "#6e6b7b",
            marginTop: 4,
          }}
        >
          {size?.width > 820 ? (
            <p>Jonathan Alejandro Flores Saldaña</p>
          ) : (
            <Avatar
              size={55}
              icon={<UserOutlined style={{ verticalAlign: "middle" }} />}
            />
          )}
          <p
            style={{
              color: "green",
              marginTop: 5.5,
              textAlign: "end",
              fontSize: "12px",
            }}
          >
            Candidato
          </p>
        </span>
      </Row>
      {size?.width > 820 ? (
        <Col>
          <Avatar
            size={55}
            icon={<UserOutlined style={{ verticalAlign: "middle" }} />}
          />
        </Col>
      ) : null}
    </Row>
  );
}
