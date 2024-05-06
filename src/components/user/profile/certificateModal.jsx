import React, { useState } from "react";
import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row, Select } from "antd";
const CertificateModal = (props) => {
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
        title="Thêm mới chứng chỉ ngoại ngữ"
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
        <Divider />
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 600 }}
          onFinish={onSubmit}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên chứng chỉ"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào tên chứng chỉ!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Loại chứng chỉ"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn loại chứng chỉ!",
                  },
                ]}
              >
                <Select placeholder="Xin hãy lựa chọn chứng chỉ">
                  <Option value="1">Chứng chỉ tiếng anh</Option>
                  <Option value="2">Chứng chỉ khác</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="place"
                label="Nơi cấp"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập nơi cấp",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Ngày cấp"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn ngày cấp",
                  },
                ]}
              >
                <DatePicker placeholder="Chọn ngày cấp" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateExpire"
                label="Ngày cấp"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn ngày hết hạn",
                  },
                ]}
              >
                <DatePicker placeholder="Chọn ngày hết hạn" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="typeCertificate"
                label="Xếp loại"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn ngày cấp",
                  },
                ]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="usually"
                label="Mức độ sử dụng"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn mức độ sử dụng",
                  },
                ]}
              >
                 <Select placeholder="Xin hãy lựa mức độ sử dụng">
                  <Option value="1">Thường xuyên</Option>
                  <Option value="2">Thỉnh thoảng</Option>
                  <Option value="3">Ít dùng</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default CertificateModal;
