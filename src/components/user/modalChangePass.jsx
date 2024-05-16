import React, { useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  message,
  notification,
} from "antd";
import { changePassword } from "../../services/api";

const ChangePassword = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setOpenModal(false);
  };
  const onSubmit = async (values) => {
    try {
      const data = {
        email: props.email,
        oldPassword: values.oldPassword,
        password: values.password,
      };
      const res = await changePassword(data);
      setLoading(true);
      if (res && res.statusCode === 200) {
        notification.success({
          description: "Đổi mật khẩu thành công, vui lòng đăng nhập lại",
          message: "Đổi mật khẩu",
        });
        setLoading(false);
        props.handleLogout();
        form.resetFields();
        handleCancel();
      }
    } catch (error) {
      console.log("====================================");
      console.log("Có lỗi tại đăng kí department", error);
      console.log("====================================");
    }
  };
  return (
    <>
      <Modal
        maskClosable={false}
        open={props.openModal}
        title="Đổi mật khẩu"
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
            <Col span={24}>
              <Form.Item
                name="oldPassword"
                label="Mật khẩu cũ"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền vào mật khẩu cũ!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="password"
                label="Mật khẩu mới"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền vào mật khẩu mới!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Xác nhận mật khẩu mới"
                name="password2"
                dependencies={["password"]}
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu mới bạn nhập không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ChangePassword;
