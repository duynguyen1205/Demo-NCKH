import { CheckCircleFilled } from "@ant-design/icons";
import { MdAccessTime } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Radio,
  Row,
  Steps,
  message,
} from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  councilConfigEarly,
  councilConfigMidterm,
} from "../../../services/api";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
const { TextArea } = Input;

const ModalPickTimeLeader = (props) => {
  const isModalOpen = props.isModalOpen;
  const today = dayjs().add(1, "day");
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [meetingDate, setMeetingDate] = useState(today);
  const [meetingDetails, setMeetingDetails] = useState("");
  const [council, setCouncil] = useState([]);
  const location = useLocation();
  let path = location.pathname.split("/");
  let topicId = path[4];
  let checkTerm = path[2];
  const navigate = useNavigate();
  const handleRadioChange = (itemId) => {
    const updatedDataUser = props.dataUser.map((user) => ({
      ...user,
      isChairman: user.id === itemId,
    }));
    setSelectedLeader(itemId);
    setCouncil(updatedDataUser);
  };
  const handleDateChange = (date) => {
    setMeetingDate(date);
  };

  const handleDetailsChange = (e) => {
    setMeetingDetails(e.target.value);
  };
  // set up initial value for the form
  const maxDate = dayjs().add(7, "day");
  const disabledDate = (current) => {
    // Disable Saturdays (6) and Sundays (0)
    return current && (current.day() === 6 || current.day() === 0);
  };
  const steps = [
    {
      title: "Lựa chọn chủ tịch hội đồng",
      content: (
        <>
          <div>
            {" "}
            <List
              dataSource={props.dataUser}
              bordered
              renderItem={(item) => (
                <List.Item>
                  <Radio
                    value={item.id}
                    checked={selectedLeader === item.id}
                    onChange={() => handleRadioChange(item.id)}
                  >
                    {item.fullName} - {item.position} - {item.degree}
                  </Radio>
                </List.Item>
              )}
            />
          </div>
        </>
      ),
      icon: <FaUserTie />,
    },
    {
      title: "Chọn thời gian",
      content: (
        <>
          {" "}
          <div>
            <Divider />
            <Row gutter={20}>
              <Col>
                <Form.Item name="date" label="Ngày họp" labelCol={{ span: 24 }}>
                  <DatePicker
                    format={dateFormat}
                    defaultValue={today}
                    minDate={today}
                    maxDate={maxDate}
                    onChange={handleDateChange}
                    disabled={disabledDate}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="details"
                  label="Chi tiết"
                  labelCol={{ span: 24 }}
                >
                  <TextArea
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                    onChange={handleDetailsChange}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </>
      ),
      icon: <MdAccessTime />,
    },
    {
      title: "Xác nhận lại thông tin",
      content: (
        <>
          <div>
            {" "}
            <p style={{ fontSize: "18px", marginBottom: "8px" }}>
              Danh sách thành viên hội đồng
            </p>
            <List
              dataSource={council}
              bordered
              renderItem={(item) => (
                <List.Item
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {item.fullName} - {item.position} - {item.degree}{" "}
                  {item.isChairman ? (
                    <span style={{ color: "red" }}> Chủ tịch hội đồng</span>
                  ) : null}
                </List.Item>
              )}
            />
            <div style={{ marginTop: "8px" }}>
              <p style={{ fontSize: "18px", marginBottom: "8px" }}>
                Ngày họp: {meetingDate && meetingDate.format(dateFormat)}
              </p>

              <p style={{ fontSize: "18px", marginBottom: "8px" }}>
                Chi tiết: {meetingDetails}
              </p>
            </div>
          </div>
        </>
      ),
      icon: <CheckCircleFilled />,
    },
  ];
  const [current, setCurrent] = useState(0);
  const next = () => {
    if (current === 0 && selectedLeader === null) {
      message.error("Vui lòng chọn chủ tịch hội đồng trước khi tiếp tục.");
      return;
    } else if (current === 1 && meetingDetails === "") {
      message.error("Vui lòng chọn ngày và nhập chi tiết trước khi tiếp tục.");
      return;
    }
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    icon: item.icon,
  }));
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  const handleSubmit = async () => {
    const councilArray = council.map((user) => ({
      councilId: user.id,
      isChairman: user.isChairman,
    }));

    const data = {
      topicId: topicId,
      meetingTime: dayjs(meetingDate).local().format(),
      councils: councilArray,
      meetingDetail: meetingDetails,
    };
    let res;
    try {
      if (checkTerm === "earlyterm") {
        res = await councilConfigEarly(data).catch((error) => {
          console.error("Lỗi trong councilConfigEarly:", error);
          throw error;
        });
      } else if (checkTerm === "midterm") {
        res = await councilConfigMidterm(data).catch((error) => {
          console.error("Lỗi trong councilConfigMidterm:", error);
          throw error;
        });
      }
      if (res && res.isSuccess) {
        message.success("Tạo hội đồng đánh giá thành công");
        navigate("/staff");
      } else {
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        message.error("Tạo hội đồng không thành công");
      }
    } catch (error) {
      console.log("Lỗi tại tạo hội đồng: ", error.message);
    }
  };
  return (
    <>
      <Modal
        title={steps[current].title}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <div>
            {current > 0 && (
              <Button
                style={{
                  margin: "0 8px",
                }}
                onClick={() => prev()}
              >
                Quay lại
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Tiêp tục
              </Button>
            )}

            {current === steps.length - 1 && (
              <Button type="primary" onClick={handleSubmit}>
                Xác nhận
              </Button>
            )}
          </div>,
        ]}
      >
        <Steps current={current} items={items} />
        {steps[current].content}
      </Modal>
    </>
  );
};
export default ModalPickTimeLeader;
