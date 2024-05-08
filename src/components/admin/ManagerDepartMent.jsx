import React, { useEffect, useState } from "react";
import { Button, Table, Tooltip, message } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
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
      title: "Email",
      dataIndex: "accountEmail",
    },
    {
      title: "Khoa",
      dataIndex: "departmentName",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Vai trò",
      render: (text, record, index) => {
        return <>{record.isDean ? "Dean" : "User"}</>;
      },
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
            <Tooltip placement="top" title="Chỉnh sửa vai trò">
              <EditOutlined
                onClick={() => handleEdit(record.accountEmail)}
                style={style1}
              />{" "}
              <Tooltip placement="top" title="Xóa quá chứng chỉ">
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
  return (
    <div>
      <h2 style={{ fontWeight: "bold", fontSize: "30px", color: "#303972" }}>
        Danh sách các khoa
      </h2>
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
      <Table columns={columns} dataSource={listUser} loading={loading} />
      <DepartmentModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        getAllDepartment={getDepartment}
      />
    </div>
  );
};
export default ManagerDepartment;
