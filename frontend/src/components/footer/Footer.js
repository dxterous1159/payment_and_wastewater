import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";


const FooterBox = styled.div`
  bottom: 0;
  background: #9b826f;
  height: auto;
  padding: 40px;
  display: grid;
  grid-template-columns: 50% 25% 25%;
`;

const FooterCredit = styled.div`
  bottom: 0;
  background: #066;
  height: auto;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Box = styled.div`
  background: #ff2;
  height: auto;
  padding: 0 15px;
  width: 100%;
  border: #000 solid 1px;
`;

const Contect = styled.div`
  background: #509;
  display: flex;
  //font-size: 28px;
`;

const ContectIcon = styled.div`
  background: #ff0000;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  size: 30;
`;


function Footer() {
  return (
    <>
      <FooterBox>
        <Box>
        <span>Devwares</span>
        <p >
          We are creating High Quality Resources and tools to Aid developers
          during the developement of their projects
        </p>

        <Contect>
          <ContectIcon>
          <FaIcons.FaPhoneAlt/>
          </ContectIcon>
          <ContectIcon>
          <MdIcons.MdEmail/>
          </ContectIcon>
          <ContectIcon>
          <FaIcons.FaFacebook/>
          </ContectIcon>
          <ContectIcon>
          <MdIcons.MdOutlineWeb/>
          </ContectIcon>
          
        
        
        
        
        </Contect>

        </Box>
        <Box>
        <span>Devwares</span>
        <p>
          We are creating High Quality Resources and tools to Aid developers
          during the developement of their projects
        </p>
        </Box>
        <Box>
        <span>Devwares</span>
        <p>
          We are creating High Quality Resources and tools to Aid developers
          during the developement of their projects
        </p>
        </Box>
        
      </FooterBox>
      <FooterCredit>
        <span>Copyright 2022 © By Kamin & Tanongsak</span>
      </FooterCredit>
    </>
  );
}

export default Footer;
