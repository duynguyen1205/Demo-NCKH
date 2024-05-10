import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tooltip, message } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { assignDepartmentByAdmin, getAllDepartment } from "../../services/api";
import DepartmentModal from "./departmentModal";

const ManagerDepartment = () => {
  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState();
  const [openModal, setOpenModal] = useState(false);
  const getDepartment = async () => {
    try {
      setLoading(true);
      const res = await getAllDepartment();
      if (res && res?.data) {
        setListUser(res?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log("====================================");
      console.log("có lỗi tại admin account", error);
      console.log("====================================");
    }
  };
  // edit working process
  const handleEdit = async (departmentName) => {
    try {
      const data = {
        departmentName: departmentName,
      };
      //   const res = await assignDepartmentByAdmin(data);
      //   if (res && res.statusCode === 200) {
      //     message.success("Chuyển vai trò thành công");
      //     getDepartment();
      //   }
    } catch (error) {
      console.log("====================================");
      console.log("Có lỗi tại admin department");
      console.log("====================================");
    }
  };
  const handleDelete = () => {};
  const columns = [
    {
      title: "Khoa",
      dataIndex: "departmentName",
    },
    {
      title: "Hành động",
      render: (text, record, index) => {
        const style1 = {
          color: "blue",
          fontSize: "18px",
          cursor: "pointer",
          paddingTop: "2px",
        };
        const style2 = {
          color: "red",
          fontSize: "18px",
          margin: "0 10px",
          cursor: "pointer",
        };
        return (
          <div>
            <Tooltip placement="top" title="Chỉnh sửa khoa">
              <EditOutlined
                onClick={() => handleEdit(record.accountEmail)}
                style={style1}
              />{" "}
              <Tooltip placement="top" title="Xóa khoa">
                <DeleteOutlined onClick={() => handleDelete()} style={style2} />
              </Tooltip>
            </Tooltip>
          </div>
        );
      },
      align: "center",
    },
  ];

  useEffect(() => {
    getDepartment();
  }, []);
  const renderHeader = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "30px", color: "#303972" }}>
        Danh sách các khoa
      </h2>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpenModal(true)}
      >
        Thêm mới
      </Button>
    </div>
  );
  return (
    <div>
      <Table
        title={renderHeader}
        columns={columns}
        dataSource={listUser}
        loading={loading}
      />
      <DepartmentModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        getAllDepartment={getDepartment}
      />
    </div>
  );
};
export default ManagerDepartment;
