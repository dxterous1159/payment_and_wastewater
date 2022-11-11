import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as RiIcons from "react-icons/ri";
import ProfileMenu from "./ProfileMenu";
import { ProfileData } from "./ProfileData";
import logo from "../../images/logo.png";
import "../../App.css";

const NavIconRight = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  width: auto;
`;

const MenuTrigger = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
`;

const UsernameTitle = styled.div`
  background: #fff;
  margin: 0 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 16px;
`;

const NavIcon = styled(Link)`
  margin-right: 10px;
  font-size: 32px;
  //height: 80px;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  &:hover,
  :focus {
    color: #333;
  }
`;

const DropdownMenu = styled.div`
  background: #fff;
  margin-top: 60px;
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  position: fixed;
  right: 0;
  top: ${({ openProfile }) => (openProfile ? "0" : "-100%")};
  z-index: 10;
`;


function ViewProfile() {
  const [openProfile, setOpenProfile] = useState(false);
  const showViewProfile = () => setOpenProfile(!openProfile);

  return (
    <NavIconRight>
      <MenuTrigger>
        <img src={logo} />
      </MenuTrigger>
      <UsernameTitle>
        <p>Firstname</p>
      </UsernameTitle>
      <NavIcon>
        <RiIcons.RiArrowDownSFill onClick={showViewProfile} />
      </NavIcon>
      <DropdownMenu openProfile={openProfile}>
        <ul>
          {ProfileData.map((item, index) => {
            return (
                    <ProfileMenu item={item} key={index} />
            );
          })}
        </ul>
      </DropdownMenu>
    </NavIconRight>
  );
}

export default ViewProfile;
