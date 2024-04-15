import { useEffect, useState } from "react";
import { Form, Input, Button, message, Statistic } from "antd";
import "./login.css";
import Img from "./img/log.svg";
import Re from "./img/register.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { jwtDecode } from "jwt-decode";
import {
  loginAccount,
  registerAccount,
  registerEmail,
} from "../../services/api";
import { useNavigate } from "react-router-dom";
const { Countdown } = Statistic;
const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [action, setAction] = useState("login");
  const [email, setEmail] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const navigation = useNavigate();
  const handleToggle = (action) => {
    setAction(action);
    setToggle(!toggle);
  };
  const onFinish = async (values) => {
    try {
      if (action === "login") {
        const data = {
          email: values.email,
          password: values.password,
        };
        const res = await loginAccount(data);
        if (res && res.isSuccess) {
          localStorage.setItem("token", res.data.token);
          if (res.data.isRegisteredInfor === false) {
            message.info("Vui lòng đăng kí thông tin trước khi tiếp tục");
            navigation("/registerInfor");
          } else {
            const decoded = jwtDecode(res.data.token);
            localStorage.setItem("userId", decoded?.userid);
            if(decoded.role === "Dean") {
              navigation("/user/manager");
            } 
            else if(decoded.role === "User") {
              navigation("/user");
            }
            else if(decoded.role === "Staff") {
              navigation("/staff");
            }
          }
        } else {
          message.error("Vui lòng kiểm tra lại thông tin");
        }
      } else if (action === "register") {
        const data = {
          email: values.email,
          password: values.password,
          otp: values.otp,
        };
        const res = await registerAccount(data);
        if (res && res.isSuccess) {
          message.success("Đăng kí tài khoản thành công!");
          handleToggle("login");
        }
      }
    } catch (error) {
      console.log("Error at login component", error);
    }
  };
  const handleSendOTP = async () => {
    // Xử lý logic khi người dùng nhấn nút "Gửi mã OTP"
    if (email === null) {
      message.error("Vui lòng nhập email");
    } else {
      setWaiting(true);
      try {
        const res = await registerEmail({
          email: email,
        });
        if (res && res.isSuccess) {
          message.success("Vui lòng check mail để lấy mã otp");
        }
      } catch (error) {
        console.log("Error tại đăng kí account ", error);
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token") !== null ? true : false;
    if (token) {
      navigation(-1);
    }
  }, []);
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
                      disabled={waiting}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {waiting ? (
                        <Countdown
                          value={Date.now() + 2 * 60 * 1000}
                          onFinish={() => setWaiting(false)}
                          format="mm:ss"
                        />
                      ) : (
                        "Gửi mã OTP"
                      )}
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
                  placeholder="Mật khẩu"
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
