import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "code"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code",
];
const customStyles = `
  .ql-editor {
    background-color: white;
    width: 100%; /* Bự ra */
    height: 100px; /* Chiều cao mong muốn */
  }
`;

const TextEditor = ({ value, onChange, placeholder }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (content, delta, source, editor) => {
    const text = editor.getText().trim();
    if (text.length < 100 || text.length > 1000) {
      setErrorMessage("Nội dung phải có từ 100 đến 1000 kí tự.");
    } else {
      onChange(content);
      setErrorMessage("");
    }
  };
  return (
    <>
      <style>{customStyles}</style>
      <ReactQuill
        theme="snow"
        value={value || ""}
        modules={modules}
        formats={formats}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
};

export default TextEditor;
