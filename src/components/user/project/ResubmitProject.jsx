import { Table, Space } from "antd";
import "./table.scss";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FileSyncOutlined,
  InfoCircleOutlined,
  ScheduleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { getReviewDocuments } from "../../../services/api";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation, useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

const ResubmitProject = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicLink, setTopicLink] = useState([]);
  const [data, setDataUser] = useState({});
  const [status, setStatus] = useState(false);
  const userId = "5b5e31b2-cb63-47c7-b92a-129e15a2b2e3";
  const [dataReviewDocument, setDataReviewDocument] = useState([]);

  const location = useLocation();
  let topicId = location.pathname.split("/");
  topicId = topicId[4];

  const columns = [
    {
      title: "Giai đoạn",
      key: "giaidoan",
      dataIndex: "state",
      width: "10%",
    },
    {
      title: "Góp ý của hội đồng",
      dataIndex: "resultFileLink",
      key: "resultFileLink",
      width: "20%",
      render: (text, record, index) => {
        return <a href={text}>File chỉnh sửa</a>;
      },
    },
    {
      title: "File chỉnh sửa",
      dataIndex: "documents",
      key: "documents",
      width: "30%",
      render: (text) => {
        <link href={text}>â</link>;
      },
    },

    {
      title: "Hạn nộp",
      dataIndex: "deadline",
      key: "deadline",
      width: "10%",
    },
    {
      title: "Trạng thái",
      dataIndex: "decisionOfCouncil",
      key: "decisionOfCouncil",
      width: "10%",
    },

    {
      title: "Chi tiết",
      width: "20%",
      render: (text, record, index) => {
        const style1 = {
          color: "blue",
          fontSize: "1.5em",
          cursor: "pointer",
        };
        const style2 = {
          color: "green",
          fontSize: "1.5em",
          margin: "0 10px",
          cursor: "pointer",
        };
        const style3 = {
          color: "red",
          fontSize: "1.5em",
          cursor: "pointer",
        };
        const isChairMan =
          dataReviewDocument[0]?.role === "Chairman" ? true : false;
        return (
          <div>
            <EditOutlined style={style1} onClick={() => {}} />
            {isChairMan && (
              <>
                <CheckOutlined onClick={() => {}} style={style2} />
                <CloseOutlined onClick={() => {}} style={style3} />
              </>
            )}
          </div>
        );
      },
      align: "center",
    },
  ];

  const getReviewDoc = async () => {
    const res = await getReviewDocuments({
      userId: userId, // Nguyen Thanh B-chairman
      topicId: topicId,
    });
    if (res && res?.data) {
      const data = [
        {
          role: res.data.role,
          state: res.data?.reviewEarlyDocument
            ? "Đăng ký đề tài"
            : "Giai đoạn tiếp theo",
          deadline: dayjs(res.data.reviewEarlyDocument.deadline).format(
            dateFormat
          ),
          decisionOfCouncil: res.data.reviewEarlyDocument.decisionOfCouncil,
          resultFileLink: res.data.reviewEarlyDocument.resultFileLink,
          documents:
            res.data.reviewEarlyDocument.documents.length > 0
              ? res.data.reviewEarlyDocument.documents
              : null,
        },
      ];
      console.log("đây là res data", res.data);
      console.log("đây là data", data);
      setDataReviewDocument(data);
    }
  };
  useEffect(() => {
    getReviewDoc();
  }, [status]);

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
    console.log("parms: ", pagination, filters, sorter, extra);
  };
  return (
    <>
      <h2
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          color: "#303972",
          marginBottom: "40px",
        }}
      >
        Bổ sung tài liệu
      </h2>
      <Table
        rowClassName={(record, index) =>
          index % 2 === 0 ? "table-row-light" : "table-row-dark"
        }
        bordered={true}
        columns={columns}
        dataSource={dataReviewDocument}
        onChange={onChange}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          pageSizeOptions: ["5", "10", "15"],
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]} - {range[1]} on {total} rows
              </div>
            );
          },
        }}
        loading={isLoading}
      />
    </>
  );
};
export default ResubmitProject;
