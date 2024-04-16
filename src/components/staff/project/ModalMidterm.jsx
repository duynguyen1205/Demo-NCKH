import React, { useState } from "react";
import { Modal, Calendar, theme, Divider, message } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  makeDeadlineFinalSubmit,
  makeDeadlineSubmit,
} from "../../../services/api";
import { useLocation } from "react-router-dom";
dayjs.extend(utc);
const ModalMidTerm = (props) => {
  const { token } = theme.useToken();
  const [selectedTime, setSelectedTime] = useState();
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
      const data = {
        topicId: props.data.topicId,
        deadline: dayjs(selectedTime).local().format(),
      };
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
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
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
        <div style={{ height: 350 }}>
          <Calendar fullscreen={false} onChange={onChange} />
          <p>
            Ngày: <span>{selectedTime?.format("DD-MM-YYYY")}</span>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalMidTerm;
