import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import { MailOutlined, LockOutlined, TwitterOutlined, LinkedinOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import logo from "../../assets/logoBV.png";

const Login = () => {
  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  return (
    <section>
      <Row justify="center">
        <Col span={12}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={logo} alt="logo" style={{ maxWidth: '100px' }} />
          </div>
          <Form onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <p>Sign in with your account</p>
                <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                  <Input prefix={<MailOutlined />} placeholder="Email address" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Sign in
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <p>Sign in using social media</p>
                <Button type="primary" className="twitter" block>
                  <TwitterOutlined /> Login with Twitter
                </Button>
                <Button type="primary" className="linkedin" block>
                  <LinkedinOutlined /> Login with Linkedin
                </Button>
                <Button type="primary" className="facebook" block>
                  <FacebookOutlined /> Login with Facebook
                </Button>
                <Button type="primary" className="google-plus" block>
                  <GoogleOutlined /> Login with Google+
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </section>
  );
};

export default Login;
