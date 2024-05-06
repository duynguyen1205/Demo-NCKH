import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotPermited = () => {
  const navigation = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi, bạn không được phép vào trang này"
      extra={
        <Button type="primary" onClick={() => navigation(-1)}>
          Quay trở lại
        </Button>
      }
    />
  );
};

export default NotPermited;
