import React, { useState } from "react";
import { Button, DatePicker, message } from "antd";
import { assignHoliday } from "../../services/api";
import dayjs from "dayjs-ext";
const ManagerHoliday = () => {
  const [listDate, setListDate] = useState([]);
  const onChange = (date, dateString) => {
    console.log(dateString);
    setListDate(dateString);
  };
  const today = dayjs();
  const handleSubmit = async () => {
    try {
      const data = {
        holidays: listDate,
      };
      const res = await assignHoliday(data);
      if (res && res.statusCode === 200) {
        message.success("Thêm mới ngày nghỉ lễ thành công");
        setListDate([]);
      }
    } catch (error) {
      console.log("có lỗi tại thêm mới ngày nghỉ lễ");
    }
  };
  return (
    <>
      <h2>Quản lí ngày nghỉ lễ</h2>
      <DatePicker multiple minDate={today} onChange={onChange} />
      <Button
        onClick={() => handleSubmit()}
        type="primary"
        style={{ marginTop: "20px" }}
      >
        Thêm ngày nghỉ lễ
      </Button>
    </>
  );
};
export default ManagerHoliday;
