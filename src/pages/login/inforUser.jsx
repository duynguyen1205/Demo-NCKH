import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, DatePicker, Select } from "antd";
import { message } from "antd";
import { Row, Col, } from "antd";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getAllDepartment } from "../../services/api";
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
const today = dayjs();


const InforUser = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [departMent, setDepartMent] = useState([]);

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

  const getDepartment = async () => {
    const res = await getAllDepartment();
    if (res && res?.data) {
      setDepartMent(res.data);
    }
  };
  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <>

      <Form
        name="infor"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >

        <h2 className="text-center">Thông tin tài khoản</h2>

        <div className="option-text">Vui lòng nhập đầy đủ thông tin</div>

        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              hasFeedback
              name="fullName"
              label="Họ và tên"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 16 }}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên.",
                },
                {
                  min: 2,
                  message: "Bạn phải nhập ít nhất 2 kí tự.",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập họ và tên của bạn" size="large" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 13 }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại.",
                },
                {
                  min: 9,
                  message: "Số điện thoại của bạn không hợp lệ.",
                },
              ]}
            >
              <Input placeholder="Số điện thoại" size="large" />
            </Form.Item>


          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              name="departmentId"
              label="Bộ phận"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 11 }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Xin hãy chọn lĩnh vực nghiên cứu",
                },
              ]}
            >
              <Select
                style={{ width: 200 }}
                options={departMent.map((item) => ({
                  value: item.departmentId,
                  label: item.departmentName,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16 }}>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              name="identityNumber"
              label="Chứng minh nhân dân"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 18 }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập chứng minh nhân dân.",
                },
                { min: 12, message: "Chứng minh nhân dân phải có 12 kí tự." },
              ]}
            >
              <Input placeholder="Vui lòng nhập CMND." size="large" />
            </Form.Item>
          </Col>

          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              name="placeOfIssue"
              label="Nơi cấp"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 12 }}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nơi cấp CMND.",
                },
                {
                  min: 5,
                  message: "Nơi cấp không hợp lệ.",
                },
              ]}
            >
              <Input placeholder="Nơi cấp CMND." size="large" />
            </Form.Item>

          </Col>
          <Col className="gutter-row" xs={{ span: 24 }} md={{ span: 8 }}>
            <Form.Item
              hasFeedback
              name="issue"
              label="Ngày cấp"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 15 }}
              rules={[
                {
                  required: true,
                  message: "Xin hãy chọn thời gian cấp CMND.",
                },
              ]}
            >
              <DatePicker format={dateFormat} maxDate={today} />
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
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Xác nhận
        </Button>
      </Form>
    </>
  );
}

export default InforUser;
