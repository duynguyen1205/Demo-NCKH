import React, { useState } from "react";
import { Button, Col, Divider, Form, Input, Modal, Row } from "antd";
const ModalWorkProcess = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setOpenModal(false);
  };
  const onSubmit = (values) => {
    form.resetFields();
    handleCancel();
  };
  return (
    <>
      <Modal
        maskClosable={false}
        open={props.openModal}
        title="Thêm mới quá trình công tác"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay về
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <Divider/>
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onSubmit}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Thời gian"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào thời gian công tác!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Chức vụ"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập chức vụ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="specific"
                label="Lĩnh vực chuyên môn"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền lĩnh vực chuyên môn",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Tên đơn vị công tác"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền tên đơn vị công tác",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalWorkProcess;
