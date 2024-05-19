import { Col, Form, FormInstance, Input } from "antd";

export default function InputTextSearch(props: {
  form: FormInstance;
  name?: string;
  placeholder?: string;
  label?: string;
}) {
  const { form, name, placeholder, label } = props;

  return (
    <Form form={form}>
      <Col span={8} style={{ minWidth: 400 }}>
        <Form.Item name={name} label={label} labelCol={{ span: 24 }}>
          <Input.Search placeholder={placeholder} allowClear />
        </Form.Item>
      </Col>
    </Form>
  );
}
