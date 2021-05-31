import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMembersDash } from '../../Redux/actions/member'
import DashMemberCard from '../DashMemberCard/DashMemberCard'
import { Spinner } from "react-bootstrap";

const DashMemberList = ({dashid,user,manager}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMembersDash({dashid:dashid}))
    }, [])
    const isLoading = useSelector((state) => state.memberReducer.loading);
    const temp = useSelector((state) => state.memberReducer.member);
    var isManager = false;
    if(manager === user._id){
        isManager=true;
    }
    return (

        (isLoading) ?( 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
            ) :(temp.length == 0 ? (<h6>No members</h6>) : ( temp.map(e => <DashMemberCard member={e} isManager={isManager} user={user._id} key={e._id}/>) ))
    )
}

export default DashMemberList
