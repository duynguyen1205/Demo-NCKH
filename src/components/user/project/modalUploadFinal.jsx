import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  postLeaderSubmitFile,
  uploadFile,
} from "../../../services/api";

const UploadFileFinal = (props) => {
  const isModalOpen = props.isModalOpen;
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [newTopicFiles, setFileList] = useState({});

  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    props.setIsModalOpen(false);
    setFileList({});
  };
  const onSubmit = async () => {
    if (Object.values(newTopicFiles).length === 0) {
      message.error("Xin hãy tải file lên");
      return;
    }
    const data = {
      topicId: props.topicId,
      remunerationName: newTopicFiles.fileName,
      remunerationLink: newTopicFiles.fileLink,
    };
    try {
      const res = await postLeaderSubmitFile(data);
      setIsSubmit(true);
      if (res && res.statusCode === 200) {
        setIsSubmit(false);
        message.success("Tải file lên thành công");
        handleCancel();
        if (props.status) {
          props.setStatus(false);
        } else {
          props.setStatus(true);
        }
      }
    } catch (error) {
      console.log("====================================");
      console.log("có lỗi tại upload result", error);
      console.log("====================================");
    }
  };
  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    newTopicFiles,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const isCompressedFile =
          file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (!isCompressedFile) {
          message.error("Chỉ được phép tải lên file có định dạng xlsx");
          onError(file);
          return;
        }
        const response = await uploadFile(file);
        if (response.data.fileLink === null) {
          onError(response, file);
          message.error(`${file.name} file tải lên không thành công.`);
        } else {
          setFileList({
            fileName: response.data.fileName,
            fileLink: response.data.fileLink,
          });
          // Gọi onSuccess để xác nhận rằng tải lên đã thành công
          onSuccess(response, file);
          // Hiển thị thông báo thành công
          message.success(`${file.name} file tải lên thành công.`);
        }
      } catch (error) {
        // Gọi onError để thông báo lỗi nếu có vấn đề khi tải lên
        onError(error);
        // Hiển thị thông báo lỗi
        message.error(`${file.name} file tải lên thất bại.`);
      }
    },
    onRemove: (file) => {
      setFileList({});
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <>
      <Modal
        title="Nộp file tổng kết"
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
            <>
              <Col span={24}>
                <p>File mẫu tham khảo (file đã tích hợp công thức tính):</p>
                <a href="https://srms1.sgp1.cdn.digitaloceanspaces.com/thu_lao_NCKH-20240504000432756.xlsx">
                  Ấn để tải
                </a>
              </Col>
            </>

            <Divider />
            <Col span={24}>
              <Form.Item
                name="file"
                label="Chỉ hỗ trợ file xlsx"
                labelCol={{ span: 24 }}
              >
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default UploadFileFinal;
