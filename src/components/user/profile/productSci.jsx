import React, { useState } from "react";
import { Tabs } from "antd";
const ProductPage = () => {
  const items = [
    {
      key: "1",
      label: "Bài báo khoa học",
      children: "Bài báo khoa học",
    },
    {
      key: "2",
      label: "Đề tài tham gia",
      children: "Đề tài tham gia",
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        style={{
          height: 220,
        }}
        items={items}
      />
    </div>
  );
};
export default ProductPage;
