import React from 'react';
import './sidebarLink.scss';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({ linkTo, children, Icon }) => {
  return (
    <NavLink
      to={linkTo}
      className="sidebarLink"
      activeStyle={{ background: '#e5e5e5' }}
    >
      <Icon className="sidebarLink__icon" />
      <p>{children}</p>
    </NavLink>
  );
};

export default SidebarLink;
