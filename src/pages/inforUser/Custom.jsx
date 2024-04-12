import { useState } from "react";
import "./formInput.css";
import FormInput from "./FormInput";

const Step = () => {

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
      errorMessage:
        "Vui lòng điền đầy đủ họ và tên của bạn !",
      label: "Họ và tên",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "text",
      placeholder: "Vui lòng điền số điện thoại.",
      errorMessage: "Vui lòng điền số điện thoại !",
      label: "Số điện thoại",
      required: true,
    },
    {
      id: 3,
      name: "departmentId",
      type: "text",
      placeholder: "Vui lòng chọn bộ phận.",
      errorMessage: "Vui lòng chọn bộ phận đang làm việc !",
      label: "Bộ phận làm việc",
      required: true,
    },
    {
      id: 4,
      name: "identityNumber",
      type: "password",
      placeholder: "Vui lòng điền chứng minh nhân dân.",
      errorMessage: "Vui lòng điền CMND !",
      label: "Chứng minh nhân dân",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="infor">
      <form onSubmit={handleSubmit}>
        <h1>Thông tin cá nhân</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Xác nhận</button>
      </form>
    </div>
  );
};

export default Step;