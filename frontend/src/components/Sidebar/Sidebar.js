import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import logo from "../../images/logo.png";
import DateTime from "./DateTime";
import ViewProfile from "./ViewProfile";

const Nav = styled.div`
  width: 100%;
  background: #3187c3;
  height: 60px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  position: fixed;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  position: fixed;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  &:hover,
  :focus {
    color: #333;
  }
`;

const SidebarNav = styled.nav`
  background: #f0f0f0;
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;



const SidebarWrap = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  margin-top: 320px;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const SidebarBanner = styled.div`
  top: 0;
  position: fixed;
  background: #3187c3;
  width: 300px;
  height: 320px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const Logo = styled.div`
  display: flex;
`;

const LogoImg = styled.div`
  margin: 40px auto;
  margin-bottom: 0;
`;

const TextTitle = styled.div`
  margin-top: 5px;
  margin-left: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #f0f0f0;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
         
      


      <IconContext.Provider value={{}}>
        <Nav>
          <NavIcon to="#" >
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <ViewProfile />
        </Nav>
        <SidebarNav sidebar={sidebar} onLoad={showSidebar}>
          <SidebarBanner>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <Logo>
              <LogoImg>
                <img src={logo} width="140" height="140" alt="" />
              </LogoImg>
            </Logo>
            <TextTitle>
              <p>ยินดีต้อนรับเข้าสู่ </p>
              <p>เทศบาลตำบลสันผักหวาน</p>
              <p>อ.หางดง จ.เชียงใหม่</p>      
            </TextTitle>
            <DateTime />
          </SidebarBanner>
          <SidebarWrap>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>

    </>
  );
};

export default Sidebar;
