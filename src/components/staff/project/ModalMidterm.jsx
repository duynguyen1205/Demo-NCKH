import React, { useState } from "react";
import {
  Modal,
  Calendar,
  theme,
  Divider,
  message,
  Upload,
  Button,
  ConfigProvider,
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  makeDeadlineFinalSubmit,
  makeDeadlineSubmit,
  uploadFile,
} from "../../../services/api";
import { useLocation } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import locale from 'antd/locale/vi_VN';
dayjs.extend(utc);
const ModalMidTerm = (props) => {
  const today = dayjs();
  const { token } = theme.useToken();
  const [directiveMinutes, setDirectiveMinutes] = useState("");
  const [selectedTime, setSelectedTime] = useState(today);
  const location = useLocation();
  const path = location.pathname.split("/");
  const check = path[2];
  const closeModal = () => {
    props.setIsModalOpen(false);
  };

  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const onChange = (value) => {
    setSelectedTime(value);
  };
  const submit = async () => {
    try {
      if (directiveMinutes === "") {
        message.error("Vui lòng tải lên biên bản!");
      } else {
        const data = {
          topicId: props.data.topicId,
          documentSupplementationDeadline: dayjs(selectedTime).local().format(),
          directiveMinutes: directiveMinutes,
        };
        console.log(check === "finalterm");

        let res;
        if (check === "finalterm") {
          res = await makeDeadlineFinalSubmit(data);
        } else {
          res = await makeDeadlineSubmit(data);
        }
        if (res && res.isSuccess) {
          message.success("Tạo deadline thành công");
          closeModal();
        }
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };
  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    customRequest: async ({ file, onSuccess, onError }) => {
      console.log(file);
      try {
        const isCompressedFile =
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          file.type === "application/pdf";
        if (!isCompressedFile) {
          message.error("Chỉ được phép tải lên các file docx hoặc pdf!");
          setError("Chỉ được phép tải lên các file docx hoặc pdf!");
          onError(file);
          return;
        }
        const response = await uploadFile(file);
        console.log(response);
        if (response.data.fileLink === null) {
          onError(response, file);
          message.error(`${file.name} file tải lên không thành công!.`);
        } else {
          setDirectiveMinutes(response.data.fileLink);
          // Gọi onSuccess để xác nhận rằng tải lên đã thành công
          onSuccess(response, file);
          // Hiển thị thông báo thành công
          message.success(`${file.name} tải lên thành công.`);
        }
      } catch (error) {
        // Gọi onError để thông báo lỗi nếu có vấn đề khi tải lên
        onError(error);
        // Hiển thị thông báo lỗi
        message.error(`${file.name} file tải lên thất bại.`);
      }
    },
    onRemove: (file) => {
      setDirectiveMinutes("");
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const disabledDate = (current) => {
    // Get current day of the week (0 is Sunday, 6 is Saturday)
    const dayOfWeek = current.day();
    // Disable Saturday (6) and Sunday (0)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return true;
    }

    // Disable holidays
    const holidays = ["2024-04-30", "2024-05-01", "2024-04-29"];
    return holidays.some((holiday) => current.isSame(holiday, "day"));
  };
  return (
    <div style={wrapperStyle}>
      <Modal
        title="Chọn thời hạn nộp"
        open={props.isModalOpen}
        onCancel={closeModal}
        okText={"Xác nhận thông tin"}
        cancelText={"Quay về"}
        onOk={submit}
        maskClosable={false}
      >
        <div style={{ height: 450 }}>
          <ConfigProvider locale={locale}>
            <Calendar
              locale={locale}
              mode="month"
              fullscreen={false}
              onChange={onChange}
              disabledDate={disabledDate}
            />
          </ConfigProvider>
          <p>
            Ngày: <span>{selectedTime?.format("DD-MM-YYYY")}</span>
          </p>
          <p>Chỉ hỗ trợ cái file như docx hoặc pdf</p>
          <Upload {...propsUpload}>
            <Button icon={<UploadOutlined />}>Tải lên quyết định</Button>
          </Upload>
        </div>
      </Modal>
    </div>
  );
};

export default ModalMidTerm;
