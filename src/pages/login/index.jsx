<<<<<<< HEAD
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
=======
import { useState } from "react";
import "./login.css";
import Img from "./img/log.svg"
import Re from "./img/register.svg"
import '@fortawesome/fontawesome-free/css/all.min.css';


const Login = () =>{
  const [toggle,setToggle] = useState(false);
  
 return (<>

  <div class={toggle?"container sign-up-mode" : "container"}>
      <div class="forms-container">
        <div class="signin-signup">
          <form action="#" class="sign-in-form">
            <h2 class="title">SRSS</h2>
            <div class="input-field">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" />
            </div>
            <div class="input-field">
              <i className ="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Đăng nhập" class="btn solid" />
          </form>
          <form action="#" class="sign-up-form">
            <h2 class="title">SRSS</h2>
            <div class="input-field">
              <i className="fas fa-envelope"></i>
              <input type="text" placeholder="Email" />
            </div>
            <div class="input-field">
            <i class="fa-solid fa-key"></i>
              <input type="email" placeholder="OTP" />
            </div>
            <div class="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" class="btn" value="Đăng ký" />
          </form>
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>Chưa có tài khoản ?</h3>
            <p>
              Hệ thống SRSS là hệ thống đăng ký đề tài và lưu trữ thông tin. Vui lòng đăng ký tài khoản trước khi sử dụng !
            </p>
            <button class="btn transparent" id="sign-up-btn" onClick={()=>setToggle(true)}>
              Đăng ký
            </button>
          </div>
          <img src={Img} class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>Bạn đã có tài khoản ?</h3>
            <p>
                  Nếu đã có tài khoản của hệ thống SRSS, vui lòng đăng nhập để trải nghiệm !
            </p>
            <button class="btn transparent" id="sign-in-btn" onClick={()=>setToggle(false)}>
              Đăng nhập
            </button>
          </div>
          <img src={Re} class="image" alt="" />
        </div>
      </div>
    </div>
 </>)
}
export default Login;
>>>>>>> 9712139e3659fad15f8ab7201ee06fb1a8c75836
