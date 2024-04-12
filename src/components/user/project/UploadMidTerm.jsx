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
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { submitDocumentsMidterm, uploadFile } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const UploadMidTerm = (props) => {
  const isModalOpen = props.isModalOpen;
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [newTopicFiles, setFileList] = useState({});
  const navigate = useNavigate();
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
    const param = {
      topicId: props.topicId,
      newFile: newTopicFiles,
    };
    try {
      const res = await submitDocumentsMidterm(param);
      setIsSubmit(true);
      if (res && res.isSuccess) {
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
          file.type === "application/x-rar-compressed" ||
          file.type === "application/x-zip-compressed" ||
          file.type === "application/x-compressed";
        if (!isCompressedFile) {
          message.error(
            "Chỉ được phép tải lên các file đã nén (zip hoặc rar)!"
          );
          onError(file);
          return;
        }
        const response = await uploadFile(file);
        if (response.data.fileLink === null) {
          onError(response, file);
          message.error(`${file.name} file uploaded unsuccessfully.`);
        } else {
          setFileList({
            fileName: response.data.fileName,
            fileLink: response.data.fileLink,
          });
          // Gọi onSuccess để xác nhận rằng tải lên đã thành công
          onSuccess(response, file);
          // Hiển thị thông báo thành công
          message.success(`${file.name} file uploaded successfully.`);
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

  return (
    <>
      <Modal
        title="Đăng kí báo cáo giữa kì"
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
            <Col span={24}>
              <p>File mẫu tham khảo: </p>
              <a href="https://srms.sgp1.cdn.digitaloceanspaces.com/template-20240404003752374.zip">
                Ấn để tải
              </a>
            </Col>
            <Divider />
            <Col span={24}>
              <Form.Item
                name="file"
                label="Chỉ hỗ trợ cái file như zip hoặc rar"
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
export default UploadMidTerm;
