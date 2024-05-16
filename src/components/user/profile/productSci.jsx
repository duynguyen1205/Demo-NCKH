import React, { useState } from "react";
import { Tabs } from "antd";
import ScientificArticle from "./scientificArticle";
const ProductPage = () => {
  const items = [
    {
      key: "1",
      label: "Bài báo khoa học",
      children: <ScientificArticle/>,
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
