import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigation = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại"
      extra={
        <Button type="primary" onClick={() => navigation(-1)}>
          Quay về
        </Button>
      }
    />
  );
};
export default NotFound;
