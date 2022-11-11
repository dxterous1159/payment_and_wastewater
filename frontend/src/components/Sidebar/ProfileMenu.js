import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #000;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 50px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;

  &#btnProfile {
    &:hover,
    :focus {
      background: #dbeffe;
      color: green;
      border-left: 6px solid green;
      cursor: pointer;
    }
  }

  &#btnLogout {
    &:hover,
    :focus {
      background: #dbeffe;
      color: #ff0000;
      border-left: 6px solid #ff0000;
      cursor: pointer;
    }
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdowLink = styled(Link)`
  background: #fff;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 18px;
`;

const ProfileMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        id={item.id}
        to={item.path}
        onClick={item.subNav && showSubnav}
      >
        <div id={item.id}>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        {/* <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div> */}
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdowLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdowLink>
          );
        })}
    </>
  );
};

export default ProfileMenu;
