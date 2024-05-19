import { Col, Form, FormInstance, Select } from "antd";
import { filterOptionSelect } from "../../../components/residuos/create/createModal";

export default function InputSelect(props: {
  items: any[];
  isWithOptionZero?: boolean;
  name: string;
  label: string;
  form: FormInstance;
  is_required?: boolean;
}) {
  const { items, isWithOptionZero, name, label, form, is_required } = props;

  return (
    <>
      <Form form={form}>

        <Form.Item rules={[{ required: is_required }]} name={name} label={label} labelCol={{ span: 24 }}>
          <Select
            style={{ minWidth: 400 }}
            showSearch
            allowClear
            {...filterOptionSelect}
            options={[
              ...items?.map((item: any) => ({
                value: item?.id,
                label: item?.nombre,
              })) ?? [],
            ]}
            placeholder={label}
          />
        </Form.Item>
      </Form>
    </>
  );
}
