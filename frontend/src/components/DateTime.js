import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const DateTime = () => {
  var [date, setDate] = useState(new Date());

  const options = { day: "numeric", month: "short", year: "numeric" };

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const DateTitle = styled.div`
    margin-top: 10px;
    margin-left: 20px;
    font-size: 18px;
    //font-weight: bold;
    color: #f0f0f0;
  `;

  return (
    <DateTitle>
      <p>
        {" "}
        วันที่ {date.toLocaleDateString("th-TH", options)} :{" "}
        {date.toLocaleTimeString("th-TH")} น.
      </p>
    </DateTitle>
  );
};

export default DateTime;
