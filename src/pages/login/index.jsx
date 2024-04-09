import { useState } from "react";
import { Form, Input, Button } from "antd";
import "./login.css";
import Img from "./img/log.svg";
import Re from "./img/register.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { registerAccount, registerEmail } from "../../services/api";

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [action, setAction] = useState("login");
  const [email, setEmail] = useState();
  const handleToggle = (action) => {
    setAction(action);
    setToggle(!toggle);
  };
  const onFinish = async (values) => {
    console.log("Received values:", values);

    try {
      if (action === "login") {
        const data = {
          email: "string",
          password: "string",
        };
        const res = await loginAccount(data);
        if (res && res?.data) {
          console.log(res.data);
        }
      } else if (action === "register") {
        const data = {
          email: values.email,
          password: values.password,
          otp: values.otp,
        };
        const res = await registerAccount(data);
        if (res && res?.data) {
          console.log(res.data);
        }
      }
    } catch (error) {
      console.log("Error at login component", error);
    }
  };
  const handleSendOTP = async () => {
    // Xử lý logic khi người dùng nhấn nút "Gửi mã OTP"
    try {
      const res = await registerEmail(email);
      console.log("check handle send otp: ", res);
    } catch (error) {
      console.log("Error tại đăng kí account ", error);
    }
  };

  return (
    <>
      <div className={toggle ? "container sign-up-mode" : "container"}>
        <div className="forms-container">
          <div className="signin-signup">
            <Form
              size="large"
              name="loginForm"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className={toggle ? "sign-up-form" : "sign-in-form"}
            >
              <h2 className="title">SRSS</h2>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Xin hãy nhập email!" },
                  { type: "email", message: "Xin hãy nhập đúng email!" },
                ]}
                className="input-container"
              >
                <Input
                  prefix={<i className="fas fa-envelope"></i>}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              {toggle && (
                <Form.Item
                  name="otp"
                  rules={[{ required: true, message: "Xin hãy nhập mã otp" }]}
                  className="input-container input-otp-container"
                >
                  <div className="input-with-button">
                    <Input
                      prefix={<i className="fa-solid fa-key"></i>}
                      placeholder="OTP"
                      className="input-otp"
                    />
                    <Button
                      type="primary"
                      onClick={handleSendOTP}
                      className="send-otp-button"
                    >
                      Gửi mã OTP
                    </Button>
                  </div>
                </Form.Item>
              )}

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Xin hãy nhập password" }]}
                className="input-container"
              >
                <Input.Password
                  prefix={<i className="fas fa-lock"></i>}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="btn">
                  {toggle ? "Đăng ký" : "Đăng nhập"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Chưa có tài khoản ?</h3>
              <p>
                Hệ thống SRSS là hệ thống đăng ký đề tài và lưu trữ thông tin.
                Vui lòng đăng ký tài khoản trước khi sử dụng !
              </p>
              <Button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => handleToggle("register")}
              >
                Đăng ký
              </Button>
            </div>
            <img src={Img} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Bạn đã có tài khoản ?</h3>
              <p>
                Nếu đã có tài khoản của hệ thống SRSS, vui lòng đăng nhập để
                trải nghiệm !
              </p>
              <Button
                className="btn transparent"
                id="sign-in-btn"
                onClick={() => handleToggle("login")}
              >
                Đăng nhập
              </Button>
            </div>
            <img src={Re} className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
