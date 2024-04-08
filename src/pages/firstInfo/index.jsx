import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import './firstInfo.scss';
import logo from "../../assets/logoBV.png";

const FirstInfo = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Xử lý dữ liệu thông tin cá nhân, có thể gửi dữ liệu đi đâu đó hoặc thực hiện các xử lý khác
  };

  return (
    <section className="section">
      <Row justify="center">
        <Col span={28} className="form-container">
          <div className="logo">
            <img src={logo} alt="logo" style={{ maxWidth: '200px' }}  />
          </div>
          <h2>Thông tin cá nhân</h2>
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
              <Input placeholder="Họ và tên" />
            </Form.Item>
            <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
              <Input placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item name="idCard" rules={[{ required: true, message: 'Vui lòng nhập căn cước công dân!' }]}>
              <Input placeholder="Căn cước công dân" />
            </Form.Item>
            <Form.Item name="faculty" rules={[{ required: true, message: 'Vui lòng nhập khoa!' }]}>
              <Input placeholder="Thuộc khoa" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Hoàn thành
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default FirstInfo;
