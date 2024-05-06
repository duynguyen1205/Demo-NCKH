import React from "react";
import { Tabs } from "antd";
import BasicProfile from "./basicProfile";
import QualicationTable from "./qualification";
import ProcessWorkTable from "./workProcess";
import CertificateTable from "./certificateTable"
import ProductPage from "./productSci";
const items = [
  {
    key: "1",
    label: "Sơ yếu lí lịch",
    children: <BasicProfile />,
  },
  {
    key: "2",
    label: "Trình độ chuyên môn",
    children: <QualicationTable/>,
  },
  {
    key: "3",
    label: "Quá trình công tác",
    children: <ProcessWorkTable/>,
  },
  {
    key: "4",
    label: "Chứng chỉ ngoại ngữ",
    children: <CertificateTable/>,
  },
  {
    key: "5",
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
