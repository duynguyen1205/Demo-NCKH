import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import logo from "../../assets/logoBV.png"; 
import { Link } from 'react-router-dom'; 
import './login.scss'; 

const Login = () => {
  const onFinish = (values) => {
  };

  return (
    <section className="section">
      <Row justify="center">
        <Col span={28} className="form-container"> 
          <div className="logo">
            <img src={logo} alt="logo" style={{ maxWidth: '200px' }} />
            <h2>ĐĂNG NHẬP</h2> 
          </div>
          <Form onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <p style={{ color: '#000' }}>Đăng nhập</p>
                <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                  <Input prefix={<MailOutlined />} placeholder="Địa chỉ email" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                  <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="ant-btn-primary">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <p style={{ color: '#000' }}>Đăng nhập bằng tài khoản khác</p>
                <Button type="primary" className="google-plus social-media-btn" block>
                  <GoogleOutlined /> Đăng nhập bằng Google+
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="register-link">
            Chưa có tài khoản? <Link to="/register">Đăng ký</Link> 
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Login;
