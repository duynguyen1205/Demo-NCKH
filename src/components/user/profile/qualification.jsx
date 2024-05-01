import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalQualication from './modalQualification';
const columns = [
  {
    title: 'Trình độ',
    dataIndex: 'level',
    width: "9%",
  },
  {
    title: 'Chuyên ngành',
    dataIndex: 'specialized',
    width: "20%",
  },
  {
    title: 'Trường/Nơi cấp',
    dataIndex: 'address',
    width: "25%",
  },
  {
    title: 'Năm cấp bằng',
    dataIndex: 'year',
  },
  {
    title: 'Quốc gia',
    dataIndex: 'country',
    width: '10%',
  },
  {
    title: 'Tên đề tài tốt nghiệp/luận án',
    dataIndex: 'name',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    level: `thạc sĩ ${i}`,
    specialized: "Hóa học",
    address: `London, Park Lane no. ${i}`,
    year: "2024",
    country:"Việt Nam",
    name: "Nghiên cứu về biến chúng của covid 19"
  });
}
const QualicationTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div style={{marginLeft: 15,}}>
      <div
        style={{
          marginBottom: 16,
        }}
      >
       <Button type='primary' icon = {<PlusOutlined />} onClick={() => setOpenModal(true)}>Thêm mới</Button>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      <ModalQualication openModal = {openModal} setOpenModal = {setOpenModal}/>
    </div>
  );
};
export default QualicationTable;