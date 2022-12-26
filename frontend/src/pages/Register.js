import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../components/Register/FormInput";
import "../css/Register.css";
import styled from "styled-components";
import FormSelect from "../components/Register/FormSelect";

const FormBox = styled.div`
  bottom: 0;
  /* background: #f5f5f5; */
  height: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 50% 50%;
  /* border: #000 solid 1px; */
`;

const Box = styled.div`
  /* background: #ff2; */
  height: auto;
  padding: 0 15px;
  margin: 0 auto;
  width: 90%;
  /* border: #23f solid 1px; */
`;

const Register = () => {
  const [values, setValues] = useState({
    identification: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
    jobtitle: "",
  });

  const inputs1 = [
    {
      id: 1,
      name: "identification",
      type: "text",
      maxLength: 13,
      placeholder: "กรอกเลขบัตรประชาชน",
      errorMessage: "Identification should be 13 characters",
      label: "เลขบัตรประชาชน",
      pattern: "^[0-9]{13}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 6-50 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      //   pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,50}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const inputs2 = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "กรอกชื่อ",
      errorMessage: "กรุณากรอกชื่อ",
      label: "ชื่อ",
      required: true,
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "กรอกนามสกุล",
      errorMessage: "กรุณากรอกนามสกุล",
      label: "นามสกุล",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      maxLength: 10,
      placeholder: "กรอกเลขบัตรประชาชน",
      errorMessage: "Phone number should be 10 characters",
      label: "เบอร์โทร",
      pattern: "^[0-9]{10}$",
      required: true,
    },
    {
      id: 4,
      name: "jobtitle",
      type: "text",
      placeholder: "กรอกตำแหน่งงาน (ไม่จำเป็น)",
      label: "ตำแหน่งงาน",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="top60">
      <div className="formModel">
        <form onSubmit={handleSubmit}>
          <h1>เพิ่มข้อมูลลูกหนี้</h1>
          <FormBox>
            <Box>
              {inputs1.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
            </Box>
            <Box>
              <FormSelect />
              {inputs2.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
            </Box>
          </FormBox>
          {/* <Link to="/reports"> */}
            <center>
              <button>ลงทะเบียน</button>
            </center>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
