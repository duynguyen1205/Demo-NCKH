import React, { useState } from "react";
import { Modal, Calendar, theme, Divider } from "antd";

const ModalMidTerm = (props) => {
  const { token } = theme.useToken();
  const [selectedTime, setSelectedTime] = useState()

  const closeModal = () => {
    props.setIsModalOpen(false);
  };

  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const onPanelChange = (value, mode) => {
    setSelectedTime(value.format("DD-MM-YYYY "))
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const submit = () => {

  }
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
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          <p>Chọn ngày: <span>{selectedTime}</span></p>
        </div>
      </Modal>
    </div>
  );
};

export default ModalMidTerm;
