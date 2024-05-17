import { Order } from "@/interfaces/order";
import { ResponseWeShip } from "@/interfaces/response_api_weShip";
import { Shipment } from "@/interfaces/shipment";
import { DatePicker, Form, Row, Select, Table } from "antd";
import axios from "axios";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [response, setResponse] = useState<ResponseWeShip>();
  const [formFilters] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const statusENUM = [
    "Label created",
    "Picked up",
    "In transit",
    "Exception",
    "Delivered",
  ];
  const filterOptions = ["fulfillmentDate", "status", "markedAs"];

  const getShipments = async (filter?: {
    where: {};
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortDir?: "ASC" | "DESC";
  }) => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.API_URL ?? "http://localhost:3030/"}api/shipments/find`,
        { params: filter }
      )
      .then((response) => {
        setIsLoading(false);
        setResponse({ count: response.data.count });
        setShipments(response.data.rows);
        console.log(response.data);
      });
  };

  useEffect(() => {
    // create .env.local
    getShipments();
  }, []);

  const setFilter = () => {
    const formDataFilter = formFilters.getFieldsValue(true);
    const dateQuery =
      formDataFilter.fulfillmentDate &&
      formDataFilter.fulfillmentDate.length > 1
        ? {
          fulfillmentDate: {
              "[gte]": new Date(formDataFilter["fulfillmentDate"][0]).toISOString(),
              "[lte]": new Date(formDataFilter["fulfillmentDate"][1]).toISOString(),
            },
          }
        : {};
        console.log(dateQuery)
    const filter = {
      where: { ...dateQuery },
      limit: 10,
    };
    getShipments(filter);
  };

  const columns = [
    {
      key: "trackingNumber",
      dataIndex: "trackingNumber",
      title: "TRACKING ID",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "STATUS",
      render: (trackingStatus: string) => {
        return <>{trackingStatus}</>;
      },
    },
    { key: "customerName", dataIndex: "customerName", title: "RECIPIENT NAME" },
    {
      key: "order",
      dataIndex: "order",
      title: "RECIPIENT ADDRESS",
      render: (order: Order) => {
        return (
          <>
            {order.customerCountry}, {order.customerCity}
            {order.customerProvince}, {order.customerZip}
          </>
        );
      },
    },
    {
      key: "fulfillmentDate",
      dataIndex: "fulfillmentDate",
      title: "fulfillmentDate",
    },
  ];

  return (
    <>
      <Form form={formFilters}>
        <Row>
          <Form.Item name={"fulfillmentDate"} label="FulFillmentDate">
            <DatePicker.RangePicker
              allowClear
              onChange={() => {
                setFilter();
              }}
            />
          </Form.Item>
          <Form.Item name={"status"} label="Status">
            <Select
              allowClear
              showSearch
              onChange={() => {
                setFilter();
              }}
              options={statusENUM.map((status) => ({
                value: status,
                label: status,
              }))}
            />
          </Form.Item>
        </Row>
      </Form>

      <Table dataSource={shipments} columns={columns} />
    </>
  );
}
