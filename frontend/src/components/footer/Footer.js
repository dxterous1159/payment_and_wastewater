import React from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";


const FooterBox = styled.div`
  bottom: 0;
  background: #f5f5f5;
  height: auto;
  padding: 40px;
  display: grid;
  grid-template-columns: 50% 25% 25%;
`;

const FooterCredit = styled.div`
  bottom: 0;
  background: #3187c3;
  height: auto;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Box = styled.div`
  //background: #ff2;
  height: auto;
  padding: 0 15px;
  width: 100%;
  //border: #000 solid 1px;
`;
const Detail = styled.div`
  //background: #f2f;
  width: 100%;
  height: auto;
  display: flex;
  align-items:center;
  /* justify-content: center; */
  margin-top: 20px;
`;

const Contect = styled.div`
  //background: #509;
  height : auto;
  display: flex;
  
`;

const ContectIcon = styled.div`
  background: #ff0000;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  size: 30;
  margin-right: 8px;

  &#btnPhone {
    background: #FF9B78;

    /* &:hover,
    :focus {
      background: blue;
      color: #fff;
      border-left: 6px solid #ff0000;
      cursor: pointer;
    } */
  }
  &#btnEmail {
    background: #Fff100;
  }
  &#btnFacebook {
    background: blue;
  }
  &#btnLine {
    background: #00FF12;
  }
  &#btnWeb {
    background: #FF00CE;
  }
`;


function Footer() {
  return (
    <>
      <FooterBox>
        <Box>
        <h2>สำนักงานเทศบาลตำบลสันผักหวาน </h2>
          <Detail>
          
        <Contect>
          <ContectIcon id="btnPhone">
          <FaIcons.FaPhoneAlt/>
          </ContectIcon>
          <ContectIcon id="btnEmail">
          <MdIcons.MdEmail size={25}/>
          </ContectIcon>
          <ContectIcon id="btnFacebook">
          <FaIcons.FaFacebook size={25}/>
          </ContectIcon>
          <ContectIcon id="btnLine">
          <FaIcons.FaLine size={25}/>
          </ContectIcon>
          <ContectIcon id="btnWeb">
          <MdIcons.MdWeb size={25}/>
          </ContectIcon>   
        </Contect>
          </Detail>
        
        </Box>
        <Box>
        <h2>ที่อยู่</h2>
        <p>
        เลขที่ 258 หมู่ 2 ตำบลสันผักหวาน อำเภอหางดง จังหวัดเชียงใหม่ 50230
        </p>
        </Box>
        <Box>
        <h2>ติดต่อ</h2>
        <p>โทรศัพท์ : 053-131532</p>
        <p>โทรสาร (แฟกซ์): 053-482131</p>
        <p>อีเมล์ : saraban@sunpukwan.go.th</p> 
        </Box>
      </FooterBox>
      <FooterCredit>
        <span>Copyright 2022 © By สำนักงานเทศบาลตำบลสันผักหวาน</span>
      </FooterCredit>
    </>
  );
}

export default Footer;
