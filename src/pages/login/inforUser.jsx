import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import { message } from "antd";
import { Row, Col,} from "antd";


const InforUser =()=> {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      setLoading(true);

      if (res && res.status === 200) {
        form.resetFields();
        setLoading(false);
        setChecked(false);
      }
    } catch (error) {
      const errorMessage = get(error, "error.message", "Something went wrong!");
      message.error(errorMessage);
      setLoading(false);
    }
  };

  const onCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validation = (rule, value, callback) => {
    if (checked) {
      return callback();
    }
    return callback("Hãy xác nhận thông tin bạn khai báo.");
  };

  return (
    <>

      <Form
        name="signup"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
       
        <h2 className="text-center">Thông tin tài khoản</h2>

        <div className="option-text">Vui lòng nhập đầy đủ thông tin</div>

        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              hasFeedback
              name="firstName"
              label="Họ"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ của bạn.",
                },
                {
                  min: 2,
                  message: "Bạn phải nhập ít nhất 2 kí tự.",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập họ của bạn" size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              hasFeedback
              name="lastName"
              label="Tên"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 12}}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ của bạn.",
                },
                {
                  min: 2,
                  message: "Bạn phải nhập tên của bạn ít nhất 2 kí tự.",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập tên của bạn" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item
              name="identityCard"
              label="Chứng minh nhân dân"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập chứng minh nhân dân.",
                },
                { min: 12, message: "Chứng minh nhân dân phải có 12 kí tự." },
              ]}
            >
              <Input.Password placeholder="Vui lòng nhập chứng minh nhân dân." size="large" />
            </Form.Item>
          </Col>

          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item
          name="phone"
          label="Số điện thoại"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 10 }}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại.",
            },
            {
              min: 9,
              message: "Số điện thoại của bạn không hợp lệ..",
            },
          ]}
        >
          <Input placeholder="Số điện thoại" size="large" />
        </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Form.Item
            name="agree"
            valuePropName="checked"
            noStyle
            rules={[{ validator: validation }]}
          >
            <Checkbox checked={checked} onChange={onCheckboxChange}>
            Tôi xin cam kết những thông tin trên.
            </Checkbox>
          </Form.Item>
        </Form.Item>

        <Button
          type="normal"
          loading={loading}
          className="form-submit-btn"
          htmlType="submit"
          shape="round"
          icon={<DoubleRightOutlined />}
          size="large"
        >
          Next
        </Button>
      </Form>
    </>
  );
}

export default InforUser;
