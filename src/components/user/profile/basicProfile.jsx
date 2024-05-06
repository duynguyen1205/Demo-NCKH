import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "./basicProfile.scss";
import { EditOutlined } from "@ant-design/icons";
import { getAllDepartment, uploadInforUser } from "../../../services/api";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const BasicProfile = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [departMent, setDepartMent] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const navigate = useNavigate();
  const getDepartment = async () => {
    const res = await getAllDepartment();
    if (res && res?.data) {
      setDepartMent(res.data);
    }
  };
  useEffect(() => {
    form.setFieldValue("accountEmail", decoded?.email);
    getDepartment();
  }, []);
  const onFinish = async (values) => {
    try {
      const res = await uploadInforUser({
        fullName: values.fullName,
        identityNumber: values.identityNumber,
        issue: dayjs(values.issue).local().format(),
        placeOfIssue: values.placeOfIssue,
        accountEmail: values.accountEmail,
        phoneNumber: values.phoneNumber,
        departmentId: values.departmentId,
        birthday: dayjs(values.birthday).local().format(),
        homeTown: values.homeTown,
        birthPlace: values.birthPlace,
        nationName: values.nationName,
        sex: parseInt(values.sex),
        officePhoneNumber: values.officePhoneNumber,
        permanentAddress: values.permanentAddress,
        currentResidence: values.currentResidence,
        taxCode: values.taxCode,
      });
      if (res && res.statusCode === 200) {
        message.success("cập nhật thông tin cá nhân thành công");
        localStorage.setItem("token", res.data.token);
        navigate("/user");
      }
      console.log('====================================');
      console.log(res);
      console.log('====================================');
    } catch (err) {
      console.log("====================================");
      console.log("Có lỗi tại phần đăng kí thông tin cá nhân: ", err);
      console.log("====================================");
    }
  };
  return (
    <>
      <div className="header">
        <h3>Thông tin cá nhân</h3>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => setComponentDisabled(!componentDisabled)}
        >
          {componentDisabled ? "Chỉnh sửa " : "Hủy bỏ"}
        </Button>
      </div>

      <Divider />
      <div className="parent-container">
        <div className="form-container">
          <Form
            form={form}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            disabled={componentDisabled}
            style={{ maxWidth: "700px" }}
          >
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  name="fullName"
                  label="Họ và Tên"
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="birthday" label="Ngày tháng năm sinh">
                  <DatePicker
                    className="datePickProfile"
                    placeholder="Chọn ngày"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="birthPlace" label="Nơi sinh">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="homeTown" label="Quê Quán">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nationName"
                  label="Dân tộc"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="sex"
                  label="Giới tính"
                  rules={[
                    {
                      required: true,
                      message: "Xin hãy chọn giới tính!",
                    },
                  ]}
                >
                  <Select placeholder="Xin hãy lựa chọn giới tính">
                    <Option value="1">Nam</Option>
                    <Option value="2">Nữ</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="accountEmail" label="Email">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phoneNumber"
                  label="Số điện thoại"
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="officePhoneNumber"
                  label="Số điện thoại cơ quan"
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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="departmentId"
                  label="Bộ phận làm việc"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    options={departMent.map((item) => ({
                      value: item.departmentId,
                      label: item.departmentName,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="identityNumber"
                  label="Chứng minh nhân dân hoặc căn cước"
                  rules={[
                    {
                      required: true,
                      min: 12,
                      message: "CCCD phải có 12 kí tự.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="placeOfIssue"
                  label="Nơi cấp"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="issue"
                  label="Ngày cấp"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    className="datePickProfile"
                    placeholder="Chọn ngày"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="taxCode" label="Mã số thuế">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="permanentAddress" label="Địa chỉ thường trú">
                  <TextArea
                    autoSize={{
                      minRows: 2,
                      maxRows: 5,
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="currentResidence" label="Chỗ ở hiện nay">
                  <TextArea
                    autoSize={{
                      minRows: 2,
                      maxRows: 5,
                    }}
                  />
                </Form.Item>
              </Col>
              <Button type="primary" htmlType="submit">
                Cập nhật thông tin
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default BasicProfile;
