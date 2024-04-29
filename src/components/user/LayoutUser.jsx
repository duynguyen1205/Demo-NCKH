import {
  FileDoneOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  Layout,
  Menu,
  Dropdown,
  Space,
  message,
  Avatar,
  theme,
  ConfigProvider,
} from "antd";
import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./user.scss";
import logo from "../../assets/logoBV.png";
import { jwtDecode } from "jwt-decode";
const { Header, Content, Sider } = Layout;

const LayoutUser = () => {
  const token = localStorage.getItem("token");
  let decoded;
  if (token !== null) {
    decoded = jwtDecode(token);
  }
  const role = decoded?.role;
  const name = decoded?.fullname;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();
  const handleLogout = async () => {
    message.success("Đăng xuất thành công");
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };
  const items = [
    {
      label: <Link to="/user">Đăng kí đề tài</Link>,
      key: "dashboard",
      icon: <HomeOutlined />,
      hidden: role !== "User",
    },
    {
      label: <Link to="/user/manager">Đề tài sơ duyệt</Link>,
      key: "manager",
      icon: <FileProtectOutlined />,
    },
    {
      label: <Link to="/user/manager-review">Đề tài thông qua</Link>,
      key: "manager-review",
      icon: <FileSearchOutlined />,
      hidden: role !== "Dean",
    },
    {
      label: <Link to="/user/track">Theo dõi tiến độ</Link>,
      key: "track",
      icon: <FileDoneOutlined />,
    },
    {
      label: <Link to="/user/review">Xem đề tài</Link>,
      key: "review",
      icon: <FileSyncOutlined />,
    },
    {
      label: <Link to="/user/profile">Hồ sơ cá nhân</Link>,
      key: "profile",
      icon: <UserOutlined />,
    },
  ];
  const itemDropdown = [
    {
      label: <label>Quản lí tài khoản</label>,
      key: "account",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];
  const location = useLocation();
  let path = location.pathname.split("/");
  path = path[2];
  if (path === undefined) {
    path = "dashboard";
  }
  return (
    <Layout className="layout-staff">
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              colorBgContainer: "#42BC81",
              colorText: "#FFFFFF",
              colorPrimary: "#070707",
            },
          },
        }}
      >
        <Sider>
          <div style={{ margin: 16, textAlign: "center" }}>
            {" "}
            <img
              style={{ height: 100, width: 130 }}
              src={logo}
              alt="logo bệnh viện"
            />
          </div>
          <Menu
            defaultSelectedKeys={[activeMenu]}
            selectedKeys={path}
            mode="inline"
            items={items}
            onClick={(e) => setActiveMenu(e.key)}
          >
            {items.map((item) => {
              if (!item.hidden || role === "Dean") {
                return (
                  <Menu.Item key={item.key} icon={item.icon}>
                    {item.label}
                  </Menu.Item>
                );
              }
              return null;
            })}
          </Menu>
        </Sider>
      </ConfigProvider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="staff-header">
            <Dropdown
              menu={{
                items: itemDropdown,
              }}
              trigger={["click"]}
            >
              <a className="staff-href" onClick={(e) => e.preventDefault()}>
                <Space>
                  <p>{name} </p>
                  <Avatar />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Header>

        <Content className="layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutUser;
