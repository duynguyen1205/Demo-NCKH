import React, { useRef, useState } from "react";
import { Button, ConfigProvider, Modal, message } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { createTopicAPI } from "../../../services/api";
import { useNavigate } from "react-router-dom";

const ModalConfirm = (props) => {
  const recaptchaRef = useRef(null);
  const [checkCapcha, setCheckCapcha] = useState(true);
  const navigate = useNavigate();
  const onSubmit = async () => {
    const data = props.data;
    try {
      const res = await createTopicAPI(data);
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      if (res && res.isSuccess) {
        message.success("Tạo topic thành công");
        props.setFileList([]);
        props.setAddMember([]);
        props.form.resetFields();
        navigate("/user/track");
      }
    } catch (error) {
      console.error("lỗi thêm mới topic", error.message);
    }
  };

  const hideModal = () => {
    props.setOpen(false);
    setCheckCapcha(true);
    if (recaptchaRef.current) {
      console.log(recaptchaRef.current);
      recaptchaRef.current.reset();
    }
  };
  const onChange = (value) => {
    if (value !== null) {
      setCheckCapcha(false);
    } else {
      setCheckCapcha(true);
    }
  };
  const renderFooter = () => (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button shape="round" type="primary" onClick={hideModal}>
        Quay về
      </Button>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#55E6A0",
          },
        }}
      >
        <Button
          disabled={checkCapcha}
          shape="round"
          type="primary"
          onClick={onSubmit}
          style={{ margin: "0 10px" }}
        >
          Nộp đề tài
        </Button>
      </ConfigProvider>
    </div>
  );

  return (
    <>
      <Modal
        title="Xác nhận nộp đề tài"
        open={props.open}
        onCancel={hideModal}
        maskClosable={false}
        forceRender
        footer={renderFooter}
      >
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LdBn60pAAAAAADn0d2__-zqT4Tk9CqPY_4DBIdW"
          onChange={onChange}
        />
        ,
      </Modal>
    </>
  );
};
export default ModalConfirm;
