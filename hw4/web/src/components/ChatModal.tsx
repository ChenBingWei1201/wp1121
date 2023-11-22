import { Modal, Form, Input } from "antd";

type ChatModalProps = {
  open: boolean;
  onCreate: ({ name }: { name: string }) => void;
  onCancel: () => void;
};

export default function ChatModal({
  open,
  onCreate,
  onCancel,
}: ChatModalProps) {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create a new chat room"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((e) => {
            window.alert(e);
          });
      }}
      okButtonProps={{ style: { backgroundColor: "#097fed" } }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: `Error: Please enter the name of the person to chat!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
