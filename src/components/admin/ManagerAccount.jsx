import React, { useEffect, useState } from "react";
import { Table, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { assignDeanByAdmin, getAllUserAdmin } from "../../services/api";

const ManagerAccount = () => {
  const [loading, setLoading] = useState(false);
  const [listUser, setListUser] = useState();
  const getUser = async () => {
    try {
      setLoading(true);
      const res = await getAllUserAdmin();
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
  const handleEdit = async (email) => {
    try {
      const data = {
        email: email,
      };
      const res = await assignDeanByAdmin(data);
      if (res && res.statusCode === 200) {
        message.success("Chuyển vai trò thành công");
        getUser();
      }
    } catch (error) {
      console.log("====================================");
      console.log("Có lỗi tại đăng kí dean");
      console.log("====================================");
    }
  };
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
        return (
          <div>
            <Tooltip placement="top" title="Chỉnh sửa vai trò">
              <EditOutlined
                onClick={() => handleEdit(record.accountEmail)}
                style={style1}
              />
            </Tooltip>
          </div>
        );
      },
      align: "center",
    },
  ];

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <h2 style={{ fontWeight: "bold", fontSize: "30px", color: "#303972" }}>
        Danh sách tài khoản
      </h2>
      <Table columns={columns} dataSource={listUser} loading={loading} />
    </div>
  );
};
export default ManagerAccount;
