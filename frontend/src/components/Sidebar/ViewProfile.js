import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as RiIcons from "react-icons/ri";
import ProfileMenu from "./ProfileMenu";
import { ProfileData } from "./ProfileData";
import logo from "../../images/logo.png";

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
  margin: 0 15px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  font-size: 18px;
`;

const NavIcon = styled(Link)`
  margin-right: 10px;
  height: 10px;
  font-size: 32px;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  &:hover {
    color: #e5e5e5;
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
  border-radius: 0 0 5px 5px;
`;

function ViewProfile() {
  const [openProfile, setOpenProfile] = useState(false);
  const showViewProfile = () => setOpenProfile(!openProfile);
  let btnDropdown;
  if (!openProfile) {
    btnDropdown = <RiIcons.RiArrowDownSFill onClick={showViewProfile} />;
  } else {
    btnDropdown = <RiIcons.RiArrowUpSFill onClick={showViewProfile} />;
  }
  return (
    <>
      <NavIconRight>
        <MenuTrigger>
          <img src={logo} alt="uesrAvatar" width="40px" height="40px" />
        </MenuTrigger>
        <UsernameTitle>
          <p>Firstname</p>
        </UsernameTitle>
        <NavIcon>{btnDropdown}</NavIcon>
        <DropdownMenu openProfile={openProfile}>
          <ul>
            {ProfileData.map((item, index) => {
              return <ProfileMenu item={item} key={index} />;
            })}
          </ul>
        </DropdownMenu>
      </NavIconRight>
    </>
  );
}

export default ViewProfile;
