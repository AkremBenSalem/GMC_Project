import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMember } from '../../Redux/actions/member'
import MemberCard from '../MemberCard/MemberCard'
import { Spinner } from "react-bootstrap";
import "./MemberList.css"

const MemberList = ({history}) => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getMember())
    }, [])
    const loading = useSelector((state) => state.memberReducer.loading)
    const members = useSelector((state) => state.memberReducer.member)
    
    return (
        
        loading  ? 
        <Spinner animation="border" role="status" style={{marginLeft:"150px",marginRight:"150px",marginTop:"20px"}}>
        <span className="sr-only">Loading...</span>
        </Spinner> : members.length === 0 ? (<h5 style={{textAlign:"center",color:"white"}}>no memberships</h5>) :
        <div className="MemberCards">
        {members.map(e =>  <MemberCard member={e} history={history} key={e._id}/> )}
        </div>
        
        
    )
}

export default MemberList
