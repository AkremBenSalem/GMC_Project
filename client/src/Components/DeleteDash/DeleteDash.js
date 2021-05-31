import React from 'react'
import {Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteDash } from '../../Redux/actions/dashboard'

const DeleteDash = ({history,dashID}) => {
    const dispatch = useDispatch()
    const handleLeave = () => {
        dispatch(deleteDash({dashID:dashID},history))
    }
    return (
        <div>
            <Button variant="danger" onClick={handleLeave}>delete</Button>
        </div>
    )
}

export default DeleteDash
