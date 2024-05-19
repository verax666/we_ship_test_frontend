import { Button, Col, Form, FormInstance, Popover, Row, Select } from "antd";
import {
  CloseOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import TagsFilters, { DepenedenciesFiltros } from "./tags_filters";
import { sortBys } from "@/pages";

export default function FiltrosLayout(props: {
  form: FormInstance;
  watchAll: any;
  filtrosInput: any;
  dependenciasFiltros: DepenedenciesFiltros[];
  onClose: Function;
}) {
  const { form, watchAll, filtrosInput, dependenciasFiltros, onClose } = props;

  const [openPopover, setOpenPopover] = useState(false);
  const clearFiltros = () => {
    dependenciasFiltros?.forEach((element) => {
      if (element.isCloseable) {
        form.resetFields([element.property]);
      }
    });
  };

  const changeSortDir = () => {
    const dir = form.getFieldValue("sortDir");
    form.setFieldValue("sortDir", dir == "ASC" ? "DESC" : "ASC");
    onClose();
  };
  return (
    <>
      <Row style={{ padding: "10px 0px" }}>
        <Col>
          <Popover
            placement="bottomRight"
            title={
              <Row justify={"space-between"}>
                Filtros
                <Button
                  size="small"
                  onClick={() => setOpenPopover(false)}
                  icon={
                    <CloseOutlined style={{ color: "red", fontSize: 14 }} />
                  }
                ></Button>
              </Row>
            }
            open={openPopover}
            trigger="click"
            onOpenChange={(newOpen: boolean) => setOpenPopover(newOpen)}
            content={<Col>{filtrosInput}</Col>}
          >
            <Button
              type="primary"
              icon={<FilterOutlined />}
              style={{ marginRight: 20 }}
            >
              Filtros
            </Button>
          </Popover>
          {dependenciasFiltros?.filter((e) => watchAll && watchAll[e.property])
            .length > 0 &&
          dependenciasFiltros.filter(
            (e) =>
              e.isCloseable && watchAll && watchAll[e.property] && !e.disabled
          ).length > 0 ? (
            <Button
              icon={<CloseOutlined />}
              type="primary"
              style={{ background: "#D33C33", marginRight: 8 }}
              onClick={clearFiltros}
            >
              Limpiar Filtros
            </Button>
          ) : null}
          <Col
            span={24}
            style={{ marginTop: 10, marginBottom: 10, marginLeft: 5 }}
          >
            <TagsFilters
              onClose={onClose}
              dependencies={dependenciasFiltros}
              formFilter={form}
              watchAll={watchAll}
            />
          </Col>
        </Col>
        <Col>
          {watchAll && watchAll["sortDir"] && watchAll["sortDir"] == "ASC" ? (
            <SortDescendingOutlined
              onClick={changeSortDir}
              style={{ fontSize: 32 }}
            />
          ) : (
            <SortAscendingOutlined
              onClick={changeSortDir}
              style={{ fontSize: 32 }}
            />
          )}
        </Col>
        <Col>
          <Select
            onChange={(valueDir) => {
              form.setFieldValue("sortBy", valueDir);
              onClose();

            }}
            defaultValue={"fulfillmentDate"}
            style={{ minWidth: 200 }}
            allowClear
            options={sortBys?.map((sortBy: string, index: number) => ({
              value: sortBy,
              label: sortBy,
            }))}
            placeholder="sortBy"
          />
        </Col>
      </Row>
    </>
  );
}
