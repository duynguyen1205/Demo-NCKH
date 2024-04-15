import "./table.scss";
import "./card.css";
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { chairmanApprove, getReviewDocuments } from "../../../services/api";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation, useNavigate } from "react-router-dom";
import { Collapse } from 'antd';
import ModalUpload from "./ModalResubmit";
import ModalChairmanReject from "./ModalChairmanReject";
import CollapseTopic from "./CollapTopic";
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";

const ResubmitProject = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [isTableOpen, setTableOpen] = useState(false);
  const [topicLink, setTopicLink] = useState([]);
  const [data, setDataUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenR, setIsModalOpenR] = useState(false);
  const [status, setStatus] = useState(false);
  const userId = "7dc9eb1d-3b80-434b-9b7e-85dd78e5011d";
  const [dataReviewDocument, setDataReviewDocument] = useState([]);

  const location = useLocation();
  let topicId = location.pathname.split("/");
  topicId = topicId[4];
  const renderRole = (role) => {
    if (role == "Chairman") {
      return (
        <>
        <button className="btnOk" onClick={() => chairmanApprove(topicId)}>Đồng ý</button>
      <button className="btnRe" onClick={() => {
        setDataUser(dataReviewDocument);
        setIsModalOpenR(true);
      }}>Từ chối</button>
        </>
      
      )
    }
    if (role == "Leader") {
      return (
        <button className="btn" onClick={() => {
          setDataUser(dataReviewDocument);
          setIsModalOpen(true);
        }}>Tải tài liệu</button>)
    }
    return "";
  }

  const getReviewDoc = async () => {
    const res = await getReviewDocuments({
      userId: userId, 
      topicId: topicId,
    });
    if (res && res?.data) {
      const data = [
        {
          topicId,
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
      <div>
        <section>
          <div className="container1">
            <div className="cards">
              {
                dataReviewDocument.map((card, i) => (
                  <div key={i} className="card">
                    <h2 style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "#303972",
                      marginBottom: "10px",
                    }}>
                      {card.state}

                    </h2>
                    <p>Hạn nộp: {" "}
                      {card.deadline}
                    </p>
                    <p> {" "}
                      <a target="_blank" href={card.resultFileLink}>File kết quả của hội đồng</a>
                    </p>
                    {/* <Collapse items={items} onChange={onChange1} /> */}
                    <CollapseTopic data={card.documents} />
                    {renderRole(card.role)}
                    
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </div>
      <ModalUpload
        data={data}
        setDataUser={setDataUser}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <ModalChairmanReject
        data={data}
        setDataUser={setDataUser}
        isModalOpen={isModalOpenR}
        setIsModalOpen={setIsModalOpenR}
      />
    </>
  );
};
export default ResubmitProject;
