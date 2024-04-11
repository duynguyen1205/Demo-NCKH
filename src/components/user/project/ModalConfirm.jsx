import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Modal, Checkbox, Divider } from "antd";
import { getFileType } from "../../../services/api";
const ModalConfirm = (props) => {
  const [checkedList, setCheckedList] = useState([]);
  const [fileType, setFileType] = useState([]);
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onSubmit = () => {
    if (props.state === "approved") {
      props.approved();
      hideModal();
    } else {
      props.rejected();
      hideModal();
    }
  };

  const hideModal = () => {
    props.setOpen(false);
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
          disabled={fileType.length === checkedList.length ? false : true}
          shape="round"
          type="primary"
          onClick={onSubmit}
          style={{ margin: "0 10px" }}
        >
          Xác nhận
        </Button>
      </ConfigProvider>
    </div>
  );
  const listFileType = async () => {
    try {
      const res = await getFileType();
      if (res && res.isSuccess) {
        setFileType(res.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log("error: ", error);
      console.log("====================================");
    }
  };
  useEffect(() => {
    listFileType();
  }, [props.data]);

  return (
    <>
      <Modal
        title="Xác nhận đã đọc qua các file"
        open={props.openConfirm}
        onCancel={hideModal}
        maskClosable={false}
        forceRender
        footer={renderFooter}
      >
        <Divider />
        <Checkbox.Group
          style={{ display: "flex", flexDirection: "column" }}
          value={checkedList}
          onChange={onChange}
        >
          {fileType.map((option) => (
            <Checkbox key={option.typeName} value={option.typeName}>
              {option.typeName}
            </Checkbox>
          ))}
        </Checkbox.Group>
        <Divider />
      </Modal>
    </>
  );
};
export default ModalConfirm;
