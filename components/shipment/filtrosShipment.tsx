import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  SelectProps,
  Space,
  Tag,
} from "antd";
type TagRender = SelectProps["tagRender"];

export default function FiltersShipmentIndex(props: {
  form: FormInstance;
  statusENUM: string[];
  onChange: Function;
}) {
  const { form, statusENUM, onChange } = props;

  const tagRender: TagRender = (props) => {
    const { label, value } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={true}
        onClose={() => {
          form.setFieldValue("status", undefined);
        }}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Form
      form={form}
      onFieldsChange={() => {
        onChange();
      }}
    >
      <Form.Item name={"status"} label="Status">
        <Select
          tagRender={tagRender}
          style={{ minWidth: 200 }}
          allowClear
          options={statusENUM?.map((status: string, index: number) => ({
            value: status,
            label: status,
          }))}
          placeholder="Estatus"
        />
      </Form.Item>
      <Row>
        <Form.Item name={"fulfillmentDate"} label="FulFillment Date">
          <DatePicker.RangePicker />
        </Form.Item>
      </Row>
      <Form.Item name={"trackingNumber"} label="Tracker Id">
        <Input />
      </Form.Item>
      <Form.Item valuePropName="checked" name={"markedAs"} label="marked As">
        <Checkbox  value={"OPEN"}>OPEN</Checkbox>
      </Form.Item>
    </Form>
  );
}
