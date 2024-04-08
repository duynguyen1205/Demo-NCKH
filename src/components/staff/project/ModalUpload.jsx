import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  uploadFile,
  uploadReportMidTerm,
  uploadResult,
} from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(utc);
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

const ModalUpload = (props) => {
  const isModalOpen = props.isModalOpen;
  const today = dayjs().add(1, "day");
  const maxDate = dayjs().add(14, "day");
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [newTopicFiles, setFileList] = useState({});
  const [review, setReview] = useState();
  const [reviewMidtearm, setReviewMidtearm] = useState();
  const [meetingDate, setMeetingDate] = useState(today);
  const data = props.data;
  const state = data.state === "MidtermReport" ? true : false;
  const navigate = useNavigate();
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setDataUser({});
    props.setIsModalOpen(false);
    setFileList({});
    form.resetFields();
  };

  const onSubmit = async (values) => {
    if (Object.values(newTopicFiles).length === 0) {
      message.error("Xin hãy tải biên bản cuộc họp lên");
      return;
    }
    if (data.state === "MidtermReport") {
      const param = {
        topicId: data.topicId,
        newFile: newTopicFiles,
      };
      console.log("====================================");
      console.log(param);
      console.log("====================================");
      try {
        const res = await uploadReportMidTerm(param);
        console.log(res);
        setIsSubmit(true);
        if (res && res.isSuccess) {
          setIsSubmit(false);
          message.success("Tải biên bản lên thành công");
          navigate("/staff");
        }
      } catch (error) {
        console.log("====================================");
        console.log("có lỗi tại upload result", error);
        console.log("====================================");
      }
    } else {
      const param = {
        topicId: data.topicId,
        decisionOfCouncil: Number(values.decisionOfCouncil),
        resultFileLink: newTopicFiles.fileLink,
        deadline: dayjs(meetingDate).utc().format(),
      };
      try {
        const res = await uploadResult(param);
        console.log(res);
        setIsSubmit(true);
        if (res && res.isSuccess) {
          setIsSubmit(false);
          message.success("Tải biên bản lên thành công");
          navigate("/staff");
        }
      } catch (error) {
        console.log("====================================");
        console.log("có lỗi tại upload result", error);
        console.log("====================================");
      }
    }
  };
  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const isCompressedFile =
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        if (!isCompressedFile) {
          message.error("Chỉ được phép tải lên các file words, docx!");
          setError("Chỉ được phép tải lên các file words !");
          onError(file);
          return;
        }
        const response = await uploadFile(file);
        if (response.data.fileLink === null) {
          onError(response, file);
          message.error(`${file.name} file tải lên không thành công!.`);
        } else {
          setFileList({
            fileName: response.data.fileName,
            fileLink: response.data.fileLink,
          });
          // Gọi onSuccess để xác nhận rằng tải lên đã thành công
          onSuccess(response, file);
          // Hiển thị thông báo thành công
          message.success(`${file.name} tải lên thành công.`);
        }
      } catch (error) {
        // Gọi onError để thông báo lỗi nếu có vấn đề khi tải lên
        onError(error);
        // Hiển thị thông báo lỗi
        message.error(`${file.name} file upload failed.`);
      }
    },
    onRemove: (file) => {
      setFileList({});
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // set up initial value for the form
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  const handleDateChange = (date) => {
    setMeetingDate(date);
  };
  return (
    <>
      <Modal
        title="Góp ý của hội đồng"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isSubmit}
        maskClosable={false}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay về
          </Button>,
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#41C221",
              },
            }}
          >
            <Button type="primary" onClick={handleOk}>
              Gửi
            </Button>
          </ConfigProvider>,
        ]}
      >
        <Divider />
        <Form form={form} name="basic" onFinish={onSubmit}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name="code" label="ID đề tài" labelCol={{ span: 24 }}>
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="topicName"
                label="Tên đề tài"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24} hidden={state}>
              <Form.Item
                name="decisionOfCouncil"
                label="Quyết định của hội đồng"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: data.state === "MidtermReport" ? false : true,
                    message: "Xin hãy chọn quyết định của hội đồng!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  onChange={(value) => setReview(value)}
                  options={[
                    {
                      value: "1",
                      label: "Đồng ý",
                    },
                    {
                      value: "0",
                      label: "Không đồng ý",
                    },
                    {
                      value: "2",
                      label: "Đồng ý có chỉnh sửa",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            {review === "2" && (
              <Col span={24}>
                <Form.Item
                  name="date"
                  label="Ngày phải nộp lại"
                  labelCol={{ span: 24 }}
                >
                  <DatePicker
                    format={dateFormat}
                    defaultValue={today}
                    minDate={today}
                    maxDate={maxDate}
                    onChange={handleDateChange}
                  />
                </Form.Item>
              </Col>
            )}
            <Col
              span={24}
              hidden={data.state === "MidtermReport" ? false : true}
            >
              <Form.Item
                name="decisionOfCouncil"
                label="Quyết định của hội đồng"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: data.state === "MidtermReport" ? true : false,
                    message: "Xin hãy chọn quyết định của hội đồng!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  onChange={(value) => setReviewMidtearm(value)}
                  options={[
                    {
                      value: "1",
                      label: "Tiếp tục báo cáo",
                    },
                    {
                      value: "0",
                      label: "Kết thúc báo cáo",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            {reviewMidtearm === "1" && (
              <Col span={24}>
                <Form.Item
                  name="date"
                  label="Ngày phải nộp lại tài liệu"
                  labelCol={{ span: 24 }}
                >
                  <DatePicker
                    format={dateFormat}
                    defaultValue={today}
                    minDate={today}
                    maxDate={maxDate}
                    onChange={handleDateChange}
                  />
                </Form.Item>
              </Col>
            )}
            <Col span={24}>
              <Form.Item
                name="comment"
                label="Biên bản góp ý"
                labelCol={{ span: 24 }}
              >
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>Tải tài liệu lên</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpload;
