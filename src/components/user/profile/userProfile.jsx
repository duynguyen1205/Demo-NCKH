import React from "react";
import { Tabs } from "antd";
import BasicProfile from "./basicProfile";
import ProductPage from "./productSci";
const items = [
  {
    key: "1",
    label: "Sơ yếu lí lịch",
    children: <BasicProfile />,
  },
  {
    key: "2",
    label: "Sản phẩm khoa học",
    children: <ProductPage/>,
  },
];
const UserProfile = () => {
  return (
    <div style={{ backgroundColor: "white", border: "2px", height: "1000px"  }}>
      <Tabs centered defaultActiveKey="1" items={items} />
    </div>
  );
};

export default UserProfile;
