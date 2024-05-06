import React, { useState } from "react";
import { Button, Table, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import CertificateModal from "./certificateModal";


const CertificateTable = () => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const columns = [
    {
      title: "Tên chứng chỉ",
      dataIndex: "name",
    },
    {
      title: "Loại chứng chỉ",
      dataIndex: "type",
    },
    {
      title: "Nơi cấp",
      dataIndex: "place",
    },
    {
      title: "Ngày cấp",
      dataIndex: "date",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expireDate",
    },
    {
      title: "Xếp loại",
      dataIndex: "address",
    },
    {
      title: "Mức độ sử dụng",
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
            <Tooltip placement="top" title="Chỉnh sửa chứng chỉ">
              <EditOutlined onClick={() => handleEdit()} style={style1} />
            </Tooltip>
            <Tooltip placement="top" title="Xóa quá chứng chỉ">
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
      name: "Chứng chỉ tiếng anh",
      type: "Chứng chỉ khác",
      place: "BVNHĐ2",
      date: `2017`,
      expireDate: "2017-01-01T00:00:00",
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
      <CertificateModal openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};
export default CertificateTable;
