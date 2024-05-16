import { Col, Divider, InputNumber, Row, Empty, Button, Steps } from "antd";
import { useEffect, useState } from "react";
import { DeleteTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ScientificArticle = (props) => {
  const products = props.products;
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <>
      {products?.length === 0 ? (
        <Empty
          style={{ marginTop: 100 }}
          description={<span>Chưa có bài báo khoa học</span>}
        />
      ) : (
        <Row>
          <Col md={18} xs={24}>
            {/* {products.map((papper, index) => {
              return ( */}
                <div className="papper">
                  <div className="papper-content">
                    <div className="title">
                      <div>Đây là title</div>
                    </div>
                    <div className="description">
                      <div>Đây là description</div>
                    </div>
                    <DeleteTwoTone
                      style={{ cursor: "pointer" }}
                      twoToneColor="#eb2f96"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              {/* );
            })} */}
          </Col>
        </Row>
      )}
    </>
  );
};

export default ScientificArticle;
