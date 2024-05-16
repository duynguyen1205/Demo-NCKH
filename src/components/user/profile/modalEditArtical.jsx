import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  notification,
} from "antd";
import { updateArticle } from "../../../services/api";
const ArticalEditModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setProduct();
    props.setOpenModal(false);
  };
  const onSubmit = async (values) => {
    try {
      const res = await updateArticle(values);
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      if (res && res.statusCode === 200) {
        notification.success({
          message: "Thông báo",
          description: "Chỉnh sửa bài báo khoa học thành công",
        });
        props.getArtical();
        form.resetFields();
        handleCancel();
      }
    } catch (error) {
      console.log("Error at submit article: ", error);
    }
  };
  if (props.product !== undefined) {
    form.setFieldsValue(props.product);
  }
  return (
    <>
      <Modal
        maskClosable={false}
        open={props.openModal}
        title="Chỉnh sửa bài báo khoa học"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay về
          </Button>,
          <Button danger onClick={() => {}}>
            Xóa
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Cập nhật
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
                name="articleName"
                label="Tên sản phẩm"
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
                name="authorName"
                label="Tên tác giả"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy điền tên tác giả!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="publishYear"
                label="Năm xuất bản"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn năm xuất bản",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="numberOfPages"
                label="Số trang"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy chọn số trang",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="fileLink"
                label="Đường dẫn bài báo"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Xin hãy thêm đường dẫn bài báo",
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
export default ArticalEditModal;
