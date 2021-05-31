import React from 'react'
import {Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { leaveDash } from '../../Redux/actions/dashboard'

const DashLeave = ({history,dashID}) => {
    const dispatch = useDispatch()
    const handleLeave = () => {
        dispatch(leaveDash({dashID:dashID},history))
    }
    return (
        <div>
            <Button variant="danger" onClick={handleLeave}>Leave</Button>
        </div>
    )
}

export default DashLeave
