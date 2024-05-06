import React, { useState } from "react";
import { Button, Col, Divider, Form, Input, Modal, Row } from "antd";
const ModalQualication = (props) => {
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
        title="Thêm mới chuyên môn"
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
                name="level"
                label="Trình độ"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào trình độ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="specialized"
                label="Chuyên ngành"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập chuyên ngành!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="year"
                label="Năm cấp bằng"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền năm cấp bằng",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Quốc gia"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn quốc gia",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Nơi/Trường cấp"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập nơi/trường cấp!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Tên đề tài tốt nghiệp/luận án"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập tên đề tài tốt nghiệp/luận án!",
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
export default ModalQualication;
