import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import logo from "../../assets/logoBV.png"; 
import { Link } from 'react-router-dom'; 
import './register.scss'; 

const Register = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // State để kiểm soát việc hiển thị thông báo

  const onFinish = (values) => {
    // Nếu gửi thành công, hiển thị ô nhập OTP và mật khẩu đăng ký
    setShowOtpInput(true);
    // Hiển thị thông báo và cập nhật state otpSent
    setOtpSent(true);
  };
    const handleRegister = () => {
    message.success('Đăng ký thành công!');
    window.location.href = '/first-information'; 
  };


  return (
    <section className="section">
      <Row justify="center">
        <Col span={28} className="form-container"> 
          <div className="logo">
            <img src={logo} alt="logo" style={{ maxWidth: '200px' }} />
            <h2>ĐĂNG KÝ</h2> 
          </div>
          <Form onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={20}>
                <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                  <Input prefix={<MailOutlined />} placeholder="Địa chỉ email" />
                </Form.Item>
                {otpSent && ( // Kiểm tra nếu đã gửi mã OTP thành công
                  <div style={{ color: '#42bc81', marginTop: '8px' }}>Mã OTP đã được gửi đến email của bạn</div>
                )}
                {showOtpInput && ( // Hiển thị ô nhập mã OTP và mật khẩu nếu showOtpInput là true
                  <>
                    <Form.Item name="otp" rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}>
                      <Input placeholder="Mã OTP" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                      <Input type="password" prefix={<LockOutlined />} placeholder="Mật khẩu" />
                    </Form.Item>
                    <Form.Item
                      name="confirmPassword"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập lại mật khẩu!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                          },
                        }),
                      ]}
                    >
                      <Input type="password" prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit-regiter" className="ant-btn-primary" onClick={handleRegister}>
                            Đăng ký
                        </Button>
                     </Form.Item>
                  </>
                )}
                {!showOtpInput && ( // Nút Gửi mã OTP chỉ hiển thị khi chưa hiển thị ô nhập OTP và mật khẩu
                  <Form.Item>
                    <Button type="primary" htmlType="submit-OTP" className="ant-btn-primary">
                      Gửi mã OTP
                    </Button>
                  </Form.Item>
                )}
              </Col>
            </Row>
          </Form>
          <div className="login-link">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Register;
