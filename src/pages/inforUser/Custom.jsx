import { useEffect, useState } from "react";
import "./formInput.css";
import FormInput from "./FormInput";
import { getAllDepartment, uploadInforUser } from "../../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
const UserInformation = () => {
  const [departMent, setDepartMent] = useState([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullName: "",
    phoneNumber: "",
    departmentId: "",
    identityNumber: "",
    placeOfIssue: "",
    issue: "",
  });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Vui lòng điền họ và tên.",
      errorMessage: "Vui lòng điền đầy đủ họ và tên của bạn !",
      label: "Họ và tên",
      pattern:
        "^[a-zA-ZÀ-Ỹà-ỹẠ-Ỵạ-ỵĂăÂâÁáẤấẮắẠạẦầẰằẶặẨẩẪẫẬậÉéẾếẺẻẼẽẸẹÈèỀềỂểỄễẾếÍíỈỉỊịỊịÓóỐốỚớỌọỒồỜờỎỏỖỗỘộỔổỖỗỚớÚúỤụỨứỪừỮữỬửỰựÝýỲỳỶỷỸỹÝýỲỳỶỷỸỹ ]{1,50}$",
      required: true,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "text",
      placeholder: "Vui lòng điền số điện thoại.",
      errorMessage: "Vui lòng điền số điện thoại !",
      label: "Số điện thoại",
      pattern: "(0[3-5789])([0-9]{8})",
      required: true,
    },
    {
      id: 3,
      name: "departmentId",
      type: "select",
      placeholder: "Vui lòng chọn bộ phận.",
      errorMessage: "Vui lòng chọn bộ phận đang làm việc !",
      label: "Bộ phận làm việc",
      required: true,
      options: departMent,
    },
    {
      id: 4,
      name: "identityNumber",
      type: "text",
      placeholder: "Vui lòng điền chứng minh nhân dân hoặc căn cước .",
      errorMessage: "Vui lòng điền chứng minh hoặc căn cước !",
      label: "Chứng minh nhân dân hoặc căn cước",
      pattern: "\\d{12}",
      required: true,
    },
    {
      id: 5,
      name: "placeOfIssue",
      type: "text",
      placeholder: "Vui lòng điền nơi cấp CMND.",
      errorMessage: "Vui lòng điền nơi cấp CMND !",
      label: "Nơi cấp",
      required: true,
    },
    {
      id: 6,
      name: "issue",
      type: "date",
      placeholder: "Ngày cấp.",
      errorMessage: "Vui lòng chọn ngày cấp CMND !",
      label: "Ngày cấp",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const email = decoded.email;
    e.preventDefault();
    try {
      const res = await uploadInforUser({
        fullName: values.fullName,
        identityNumber: values.identityNumber,
        issue:  dayjs(values.issue).utc().format(),
        placeOfIssue: values.placeOfIssue,
        accountEmail: email,
        phoneNumber: values.phoneNumber,
        departmentId: values.departmentId,
      });
      if (res && res.statusCode === 200) {
        message.success("Đăng kí thông tin cá nhân thành công");
        navigate("/user");
      }
    } catch (err) {
      console.log("====================================");
      console.log("Có lỗi tại phần đăng kí thông tin cá nhân: ", err);
      console.log("====================================");
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const getDepartment = async () => {
    const res = await getAllDepartment();
    if (res && res?.data) {
      const newData = res.data.map((item) => ({
        value: item.departmentId,
        label: item.departmentName,
      }));
      setDepartMent(newData);
    }
  };
  useEffect(() => {
    getDepartment();
  }, []);
  return (
    <div className="infor">
      <form className="formInfor" onSubmit={handleSubmit}>
        <h1>Vui lòng điền thông tin cá nhân</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="buttonInfor">Xác nhận</button>
      </form>
    </div>
  );
};

export default UserInformation;
