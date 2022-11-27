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
  font-size: 16px;
  font-weight: bold;

  &#btnProfile {
    &:hover,
    :focus {
      background: #dbeffe;
      color: #87cc01;
      border-left: 6px solid #87cc01;
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
      </SidebarLink>
    </>
  );
};

export default ProfileMenu;
