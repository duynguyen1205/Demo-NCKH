import React, { useState } from "react";
import { Button, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ModalWorkProcess from "./modalWorking";

const ProcessWorkTable = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      title: "Thời gian",
      dataIndex: "time",
    },
    {
      title: "Chức danh",
      dataIndex: "position",
    },
    {
      title: "Lĩnh vực chuyên môn",
      dataIndex: "specific",
      width: "25%",
    },
    {
      title: "Tên đơn vị công tác",
      dataIndex: "address",
    },
    {
      title: "Hành động",
      render: (text, record, index) => {
        const style2 = {
          color: "red",
          fontSize: "18px",
          margin: "0 10px",
          cursor: "pointer",
        };
        const style1 = {
          color: "blue",
          fontSize: "18px",
          cursor: "pointer",
          paddingTop: "2px",
        };
        return (
          <div>
            <Tooltip placement="top" title="Chỉnh sửa quá trình công tác">
              <EditOutlined onClick={() => handleEdit()} style={style1} />
            </Tooltip>
            <Tooltip placement="top" title="Xóa quá trình công tác">
              <DeleteOutlined onClick={() => handleDelete()} style={style2} />
            </Tooltip>
          </div>
        );
      },
      align: "center",
    },
  ];
  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      time: `2016-2017`,
      position: "Phó phòng",
      address: `London, Park Lane no. ${i}`,
      specific: "Nội tiết",
    });
  }
  // edit working process
  const handleEdit = () => {};
  //delete working process
  const handleDelete = () => {};
  return (
    <div style={{ marginLeft: 15 }}>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpenModal(true)}
        >
          Thêm mới
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <ModalWorkProcess openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
export default ProcessWorkTable;
