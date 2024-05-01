import React from "react";
import { Tabs } from "antd";
import BasicProfile from "./basicProfile";
import QualicationTable from "./qualification";
import ProcessWorkTable from "./workProcess";

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
    children: "Content of Tab Pane 3",
  },
  {
    key: "5",
    label: "Trình độ khoa học",
    children: "Content of Tab Pane 3",
  },
];
const UserProfile = () => {
  return (
    <div style={{ backgroundColor: "white", border: "2px" }}>
      <Tabs centered defaultActiveKey="1" items={items} />
    </div>
  );
};

export default UserProfile;