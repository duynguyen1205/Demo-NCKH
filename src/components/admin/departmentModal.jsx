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
} from "antd";
import { assignDepartmentByAdmin } from "../../services/api";

const DepartmentModal = (props) => {
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
        departmentName: values.name,
      };
        const res = await assignDepartmentByAdmin(data);
        setLoading(true);
        if (res && res.statusCode === 200) {
          message.success("Thêm mới khoa thành công");
          setLoading(false);
          props.getAllDepartment();
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
        title="Thêm mới khoa"
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
                name="name"
                label="Tên khoa"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy nhập vào tên khoa!",
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
export default DepartmentModal;
