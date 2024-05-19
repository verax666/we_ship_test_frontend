import { Event } from "@/interfaces/event";
import { Col, Modal, Row, Steps, Typography } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";

export const modalEventShipment = (
  events: Event[],
  trackId: string,
  customer: string
) => {
  const styleCARD = {
    style: {
      padding: 8,
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "16px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(5px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
  };
  const eventLength = events.length;
  const currentEvent = eventLength - 1;
  Modal.info({
    width: 600,
    styles: {
      body: {
        background: "#f8f8f8",
      },
      content: {
        background: "#f8f8f8",
      },
      header: {
        background: "#f8f8f8",
      },
      footer: {
        background: "#f8f8f8",
      },
    },
    okText: "Cerrar",
    okButtonProps: {
      style: {
        background: "red",
      },
    },
    title: (
      <Col>
        <Row>
          <Typography.Text>Tracking Id # {trackId}</Typography.Text>
        </Row>
        <Row>
          <Typography.Text>{customer}</Typography.Text>
        </Row>
      </Col>
    ),
    content: (
      <Steps
        direction="vertical"
        size="small"
        current={currentEvent}
        status="process"
        items={events.map((event: Event, eventIndex: number) => ({
          status:
            eventIndex < eventLength
              ? "finish"
              : eventIndex == currentEvent
              ? "process"
              : "wait",
          title: (
            <Col span={24} {...styleCARD}>
              <Row justify={"space-between"} style={{ width: 400 }}>
                <Col>
                  <Row
                    style={{
                      fontWeight: "bold",
                      color: event.status != "Label canceled" ? "green" : "red",
                    }}
                  >
                    {event.status}
                  </Row>
                  <Row style={{ fontWeight: "lighter" }}> {event.message}</Row>
                </Col>
              </Row>

              <Col>
                <Row justify={"space-between"}>
                  <Col>
                    <CalendarOutlined
                      style={{
                        marginLeft: 10,
                        marginRight: 5,
                      }}
                    />
                    {moment(event.date).locale("es").format("LLL")}
                  </Col>
                </Row>
              </Col>
            </Col>
          ),
          subTitle: <></>,
        }))}
      />
    ),
  });
};
