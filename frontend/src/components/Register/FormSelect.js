import { useState } from "react";
import "../../css/FormSelect.css";


const FormSelect = (props) => {
  const [focused, setFocused] = useState(false);

  const options = [
    {
      label: "กรุณาเลือก",
      value: "",
    },
    {
      label: "นาย",
      value: "mr",
    },
    {
      label: "นาง",
      value: "mrs",
    },
    {
      label: "นางสาว",
      value: "miss",
    },
  ];

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formSelect">
      <label>คำนำหน้าชื่อ</label>
      <select 
        onBlur={handleFocus} 
        onFocus={() =>
          setFocused(true)
        } 
        focused={focused.toString()}
        required>

        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
        
      </select>
      <span className="message">กรุณาเลือกคำนำหน้า</span>
    </div>
  );
};

export default FormSelect;
