import { useWindowSize } from "@/components/layout/user_avatar";
import FiltersShipmentIndex from "@/components/shipment/filtrosShipment";
import { modalEventShipment } from "@/components/shipment/modalEventsShipment";
import FiltrosLayout from "@/components/tagsFilters/filtros/filtros_layout";
import { DepenedenciesFiltros } from "@/components/tagsFilters/filtros/tags_filters";
import { ItemsShipment } from "@/interfaces/itemsShipment";
import { ResponseWeShip } from "@/interfaces/response_api_weShip";
import { Shipment } from "@/interfaces/shipment";
import { EyeOutlined, SortAscendingOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  TableProps,
  Typography,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export const statusENUM = [
  "Label created",
  "Picked up",
  "In transit",
  "Exception",
  "Delivered",
];
export const sortBys = ["fulfillmentDate", "status", "trackingNumber"];

export default function Home() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [response, setResponse] = useState<ResponseWeShip>();
  const [formFilters] = Form.useForm();
  const watchAll = Form.useWatch([], {
    form: formFilters,
    preserve: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const size = useWindowSize();

  const getShipments = async (filter?: {
    where: any;
    limit?: number;
    offset?: number;
    sortBy?: string;
    sortDir?: "ASC" | "DESC";
  }) => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.API_URL ?? "http://localhost:3030/"}api/shipments/find`,
        {
          params: {
            ...filter,
            limit: pageSize,
            offset: pageSize * (currentPage - 1),
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setResponse({ count: response.data.count });
        setShipments(response.data.rows);
      })
      .catch((catchError) => {
        Modal.error({
          title: "Surgio un Error",
          content: `${catchError.error}`,
          footer: [
            <Button
            key={"CloseModalEvents"}
              onClick={() => {
                Modal.destroyAll();
                getShipments(filter);
              }}
            >
              Reintentar
            </Button>,
          ],
        });
      });
  };

  const setFilter = () => {
    const formDataFilter = formFilters.getFieldsValue(true);
    const dateQuery =
      formDataFilter.fulfillmentDate &&
      formDataFilter.fulfillmentDate.length > 1
        ? {
            fulfillmentDate: {
              "[gte]": moment(formDataFilter["fulfillmentDate"][0].toString())
                .startOf("day")
                .toISOString(),
              "[lte]": moment(formDataFilter["fulfillmentDate"][1].toString())
                .endOf("day")
                .toISOString(),
            },
          }
        : {};
    const statusFilter = formDataFilter["status"]
      ? { status: formDataFilter["status"] }
      : {};
    const markAsFilter = formDataFilter["markedAs"] ? { markedAs: "OPEN" } : {};
    const sortDirFilter = formDataFilter["sortDir"]
      ? { sortDir: formDataFilter["sortDir"] }
      : {};
    const sortByFilter = formDataFilter["sortBy"]
      ? { sortBy: formDataFilter["sortBy"] }
      : {};

    getShipments({
      where: JSON.stringify({
        ...dateQuery,
        ...statusFilter,
        ...markAsFilter,
        trackingNumber: formDataFilter["trackingNumber"],
      }),
      ...sortByFilter,
      ...sortDirFilter,
    });
  };

  useEffect(() => {
    formFilters.setFieldsValue({ sortDir: "ASC", sortBy: "fulfillmentDate" });
    setFilter();
  }, [pageSize, currentPage]);

  const dependenciasFiltros: DepenedenciesFiltros[] = [
    {
      title: "Fechas",
      property: "fulfillmentDate",
      disabled: false,
      isCloseable: true,
    },
    {
      title: "Sort Direction",
      property: "sortDir",
      disabled: false,
      isCloseable: false,
    },
    {
      title: "Sort By",
      property: "sortBy",
      options: sortBys.map((sortBy) => ({
        value: sortBy,
        label: sortBy,
      })),
      isCloseable: false,
      disabled: false,
    },
    {
      title: "Estatus",
      property: "status",
      options: statusENUM.map((status) => ({
        value: status,
        label: status,
      })),
      isCloseable: true,
      disabled: false,
    },
    {
      title: "marked AS",
      property: "markedAs",
      disabled: false,
      isCloseable: true,
    },

    {
      title: "Tracker Id",
      property: "trackingNumber",
      disabled: false,
      isCloseable: true,
    },
  ];

  const columns: TableProps["columns"] = [
    {
      key: "trackingNumber",
      dataIndex: "trackingNumber",
      title: "TRACKING ID",
      width: 200,
    },
    {
      key: "customerName",
      dataIndex: "customerName",
      title: "CUSTOMER",
      width: 300,
    },
    {
      key: "status",
      dataIndex: "status",
      title: "STATUS",
      align: "center",
      render: (trackingStatus: string, shipment: Shipment) => {
        return (
          <Row justify={"center"}>
            {trackingStatus ? (
              <Button
                onClick={() => {
                  modalEventShipment(
                    shipment.events,
                    shipment.trackingNumber,
                    shipment.customerName
                  );
                }}
                style={{ minWidth: 155 }}
                icon={<EyeOutlined />}
                type="dashed"
              >
                {trackingStatus}
              </Button>
            ) : (
              "Not Found"
            )}
          </Row>
        );
      },
      width: 150,
    },
    {
      key: "items",
      dataIndex: "items",
      title: "ITEMS",
      align: "center",
      render: (items: ItemsShipment[]) => {
        return <>{items?.length ?? "N/A"}</>;
      },
      width: 120,
    },
    {
      key: "type",
      dataIndex: "type",
      title: "TYPE DELIVERY",
      render: (type: string) => {
        return type ?? "N/A";
      },
    },
    {
      key: "customerSelectedShipping",
      dataIndex: "customerSelectedShipping",
      title: "SELECTED RATE",
      render: (rate: string) => {
        return <>{rate}</>;
      },
      width: 220,
    },
    {
      key: "fulfillmentDate",
      dataIndex: "fulfillmentDate",
      title: "FULFILLMENT DATE",
      render: (value: any) => {
        return moment(value).format("DD/MM/YYYY HH:mm");
      },
    },
  ];

  return (
    <>
      <FiltrosLayout
        onClose={() => {
          setCurrentPage(1);
          setPageSize(10);
          setFilter();
        }}
        dependenciasFiltros={dependenciasFiltros}
        form={formFilters}
        filtrosInput={
          <FiltersShipmentIndex
            onChange={() => {
              setCurrentPage(1);
              setPageSize(10);
              setFilter();
            }}
            form={formFilters}
            statusENUM={statusENUM}
          />
        }
        watchAll={watchAll}
      />
      <Spin spinning={isLoading}>
        <Table
          scroll={{ x: 1200 }}
          pagination={{
            showTotal(total: number, range: number[]) {
              return (
                <>
                  {isLoading ? (
                    <Spin spinning></Spin>
                  ) : (
                    <Typography.Text style={{ fontWeight: "bold" }}>
                      Show:
                      {(shipments?.length ?? 0) +
                        (currentPage - 1) * pageSize}{" "}
                      / {total}
                    </Typography.Text>
                  )}
                </>
              );
            },
            pageSizeOptions: [10, 20, 30, 50],
            total: response?.count,
            pageSize: pageSize,
            current: currentPage,
            onChange(page, pageSize) {
              setPageSize((prev) => pageSize);
              setCurrentPage((prev) => page);
            },
          }}
          dataSource={shipments}
          columns={columns}
        />
      </Spin>
    </>
  );
}
