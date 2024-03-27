import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  createDeanMakeDecesion,
  createMemberDecision,
  getTopicDetailAPI,
} from "../../../services/api";
import { useLocation } from "react-router-dom";

const ModalInfor = (props) => {
  const isModalOpen = props.isModalOpen;
  const [form] = Form.useForm();
  const [topicLink, setTopicLink] = useState([]);
  const [checked, setChecked] = useState(true);
  const [reason, setReason] = useState(null);
  const topicId = props.data.topicId;
  const location = useLocation();
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  const getTopicDetail = async () => {
    try {
      const res = await getTopicDetailAPI({
        topicId: topicId,
      });
      if (res && res.isSuccess) {
        setTopicLink(
          res.data.topicFiles.map((item) => ({
            name: item.topicFileName,
            link: item.topicFileLink,
          }))
        );
        form.setFieldsValue(res.data);
      }
    } catch (error) {
      console.log("Error getting topic detail: ", error);
    }
  };
  // member approval accept
  const handleOnClickApprove = () => {
    if (location.pathname === "/user/manager") {
      const param = {
        memberReviewId: "31c63d57-eeb2-4e03-bc8d-1689d5fb3d87",
        topicId: topicId,
        isApproved: true,
        reason: reason,
      };
      createMemberDecision(param)
        .then((data) => {
          if (props.status === true) {
            setStatus(false);
          } else {
            setStatus(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const param = {
        diciderId: "31C63D57-EEB2-4E03-BC8D-1689D5FB3D87",
        topicId: topicId,
        deanDecision: true,
        reason: reason,
      };
      createDeanMakeDecesion(param).then((data) => {
        if (props.status === true) {
          setStatus(false);
        } else {
          setStatus(true);
        }
      });
      handleCancel().catch((error) => {
        console.log(error);
      });
    }
  };
  // member approval rejected
  const handleOnClickRejected = () => {
    if (reason === null) {
      message.error("Vui lòng nhập lí do từ chối");
      return;
    } else {
      if (location.pathname === "/user/manager") {
        const param = {
          memberReviewId: "31c63d57-eeb2-4e03-bc8d-1689d5fb3d87",
          topicId: topicId,
          isApproved: false,
          reason: reason,
        };
        createMemberDecision(param)
          .then((data) => {
            message.success("Tạo đánh giá thành công");
            if (props.status === true) {
              props.setStatus(false);
            } else {
              props.setStatus(true);
            }
            handleCancel();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const param = {
          diciderId: "31C63D57-EEB2-4E03-BC8D-1689D5FB3D87",
          topicId: topicId,
          deanDecision: false,
          rejectReason: reason,
        };
        createDeanMakeDecesion(param)
          .then((data) => {
            message.success("Tạo đánh giá thành công");
            if (props.status === true) {
              props.setStatus(false);
            } else {
              props.setStatus(true);
            }
            handleCancel();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  const renderFooter = () => (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button shape="round" type="primary" onClick={handleCancel}>
        Quay về
      </Button>
      {props.currentTab === "notpassyet" && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#55E6A0",
            },
          }}
        >
          <Button
            disabled={checked}
            shape="round"
            type="primary"
            danger
            onClick={() => handleOnClickRejected()}
            style={{ margin: "0 10px" }}
          >
            Từ chối
          </Button>
          <Button
            disabled={checked}
            shape="round"
            type="primary"
            onClick={() => handleOnClickApprove()}
          >
            Thông qua
          </Button>
        </ConfigProvider>
      )}
    </div>
  );

  // set up initial value for the form
  useEffect(() => {
    getTopicDetail();
  }, [isModalOpen === true]);
  return (
    <>
      <Modal
        title="Thông tin đề tài"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
        footer={renderFooter}
      >
        <Divider />
        <Form form={form} name="basic">
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="topicName"
                label="Tên đề tài"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="topicLeaderName"
                label="Chủ nhiệm"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="numberOfMember"
                label="Số lượng thành viên"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categoryName"
                label="Lĩnh vực nghiên cứu"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả chi tiết"
                labelCol={{ span: 24 }}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="document"
                label="Tài liệu đính kèm"
                labelCol={{ span: 24 }}
              >
                {topicLink.map((item, index) => (
                  <span key={index}>
                    <a
                      key={index}
                      href={`https://view.officeapps.live.com/op/view.aspx?src=`+item.link}
                      target="_blank"
                      rel={item.name}
                      onClick={() => setChecked(false)}
                    >
                      {item.name}
                    </a>
                    <br />
                  </span>
                ))}
              </Form.Item>
            </Col>
            {props.currentTab === "notpassyet" && (
              <Col span={24}>
                <Form.Item
                  name="reason"
                  label="Ghi chú"
                  labelCol={{ span: 24 }}
                >
                  <Input onChange={(value) => setReason(value)} />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalInfor;
