import { Button, Card, Col, FormInstance, Row, Tag } from "antd";
import moment from "moment";
import { CloseOutlined } from "@ant-design/icons";
export interface DepenedenciesFiltros {
  title?: string;
  property: string;
  options?: { label: any; value: any }[];
  disabled: boolean;
  isCloseable?: boolean;
}

export default function TagsFilters(props: {
  watchAll: any;
  formFilter: FormInstance;
  dependencies: DepenedenciesFiltros[];
  onClose: Function;
}) {
  const { watchAll, dependencies, formFilter, onClose } = props;

  const checkTypeOf = (property: any) => {
    switch (typeof property) {
      case "object":
        if (property.length) {
          return property
            .map((date: any) => moment(date.toString()).format("DD/MM/YYYY"))
            .join(" a ");
        }
        return moment(property.toString()).format("DD/MM/YYYY");
        case "boolean":
        return "OPEN";
      default:
        return property ;
    }
  };

  const multipleSelect = (e: any) => {
    return watchAll[e.property].map((w: any, index: any) =>
      tagLayout(e, index)
    );
  };

  const tagLayout = (e: any, index?: any) => {
    return (
      <Tag
        key={`Tag-Filter${index}`}
        closable={e.isCloseable}
        onClose={(click: any) => {
          // if (Array.isArray(watchAll[e.property])) {
          //   let array: any[] = formFilter
          //     .getFieldValue(e.property)
          //     .filter((element: any, indexTemp: number) => indexTemp != index);
          //   formFilter.setFieldValue(
          //     e.property,
          //     array.length == 0 ? undefined : array
          //   );
          //   return;
          // }
          formFilter.setFieldValue(e.property, undefined);
          onClose();
        }}
        style={{ height: 20, marginTop: 2 }}
        color="blue"
      >
        {e.options
          ? e.options.filter(
              (o: any) =>
                o?.value ==
                (Array.isArray(watchAll[e.property])
                  ? watchAll[e.property][index]
                  : watchAll[e.property])
            )[0]?.label ?? ""
          : checkTypeOf(watchAll[e.property] )}
      </Tag>
    );
  };

  const componentLayout = (e: any) => {
    return (
      <>
        <Col
          style={{
            padding: 8,
            marginRight: 5,
            border: "1px #cccc solid",
            borderRadius: 10,
          }}
        >
          <Row justify={"space-between"}>
            {e.title ?? ""}{" "}
            {e?.isCloseable ? (
              <CloseOutlined
                style={{ marginLeft: 20, marginBottom: 4 }}
                onClick={() => {
                  formFilter.setFieldValue(e.property, undefined);
                }}
              />
            ) : null}
          </Row>
          {Array.isArray(watchAll[e.property])
            ? multipleSelect(e)
            : tagLayout(e)}
        </Col>
      </>
    );
  };

  return (
    <Row style={{ maxWidth: 900, overflowX: "scroll" }}>
      {dependencies?.map((e, index) => {
        if (watchAll && watchAll[e.property] && !e.disabled) {
          return componentLayout(e);
        }
      })}
    </Row>
  );
}
