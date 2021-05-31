import React, { useState } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import NotificationList from "../NotificationList/NotificationList";
import MemberList from "../MemberList/MemberList";
import './SideBarDash.css'
import DashMemberList from "../DashMemberList/DashMemberList";
import AddMember from "../AddMember/AddMember";
const SideBarDash = ({history,dashid,user,manager}) => {
  const [notifShow, setNotifShow] = useState(false);
  const [DashShow, setDashShow] = useState(false);
  const [membersShow, setmembersShow] = useState(false); 
  return (
    <SideNav className="mainSideBar">
      <SideNav.Toggle onClick={() =>  {setNotifShow(false); setDashShow(false);setmembersShow(false);}}/>
      <SideNav.Nav >
        <NavItem eventKey="profile" onSelect={() =>  {setNotifShow(false); setDashShow(false);setmembersShow(false);history.push("/profile");}}>
          <NavIcon>
            <i class="fas fa-address-card" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Profile</NavText>
        </NavItem>
        <NavItem eventKey="dashboards" onSelect={() =>  {setNotifShow(false); setDashShow(!DashShow);setmembersShow(false)}}>
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

        <NavItem eventKey="Members" onSelect={() =>  {setNotifShow(false); setDashShow(false);setmembersShow(!membersShow);}}>
          <NavIcon>
            <i class="fas fa-users" style={{ fontSize: "1.75em" }} />
          </NavIcon>
          <NavText>Members</NavText>
        </NavItem>
            {membersShow ? (
              <>
              {manager === user._id  ? (
              <div style={{marginLeft:"110px",marginBottom:"15px"}}>
                <AddMember dashID={dashid[0]}/>
              </div>
              ) : (null)}
              <DashMemberList dashid={dashid} manager={manager} user={user}/>
              </>
            ) : null}
         
        <NavItem eventKey="notifs" onSelect={() =>  {setNotifShow(!notifShow); setDashShow(false);setmembersShow(false);}}>
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

export default SideBarDash;
