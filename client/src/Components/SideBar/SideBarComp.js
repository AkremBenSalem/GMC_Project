import React, { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import NotificationList from "../NotificationList/NotificationList";
import MemberList from "../MemberList/MemberList";
import './SideBarComp.css'
const SideBarComp = ({history}) => {
  const [notifShow, setNotifShow] = useState(false);
  const [DashShow, setDashShow] = useState(false);
  return (
    <SideNav className="mainSideBar">
      <SideNav.Toggle onClick={() =>  {setNotifShow(false); setDashShow(false)}}/>
      <SideNav.Nav defaultSelected="profile">
        <NavItem eventKey="profile" onSelect={() =>  {setNotifShow(false); setDashShow(false)}}>
          <NavIcon>
            <i class="fas fa-address-card" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Profile</NavText>
        </NavItem>
        <NavItem eventKey="dashboards" onSelect={() =>  {setNotifShow(false); setDashShow(!DashShow)}}>
          <NavIcon>
            <i class="fas fa-columns" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Dashboards</NavText>
        </NavItem>
            {DashShow ? (
              <>
              <MemberList history={history}/>
              </>
            ) : null}
         
        <NavItem eventKey="notifs" onSelect={() =>  {setNotifShow(!notifShow); setDashShow(false)}}>
          <NavIcon>
            <i class="fas fa-bell" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Notifications</NavText>
          
        </NavItem>
        <div style={{ padding: 30 }}>
            {notifShow ? (
              <div>
                <h4 style={{color:"white"}}>Notifications</h4>
                <NotificationList scrollable={true}/>{" "}
              </div>
            ) : null}
          </div>
          
        
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideBarComp;
