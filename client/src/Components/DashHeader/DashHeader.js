import React from 'react'
import DashLeave from '../DashLeave/DashLeave'
import DeleteDash from '../DeleteDash/DeleteDash'
import "./DashHeader.css"

const DashHeader = ({dash,history,user,manager}) => {
    return (
      <>
        <div className="dashTitle">
        <h4 className="headerTitle">
          {dash.title}
          </h4>
          {manager === user._id ? (<DeleteDash dashID={dash.dashID} history={history} className="headerBtn"/>): (<DashLeave dashID={dash.dashID} history={history} className="headerBtn"/>)}  
          </div>
       
      </>
    )
}

export default DashHeader
