import React from 'react'
import {Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import {removeMemberDash } from '../../Redux/actions/dashboard'

const RemoveMember = ({dashID,memberID}) => {
    const dispatch = useDispatch()
    const handleLeave = () => {
        dispatch(removeMemberDash(dashID,memberID))
    }
    return (
        <div>
            <Button variant="danger" onClick={handleLeave}>delete</Button>
        </div>
    )
}

export default RemoveMember
