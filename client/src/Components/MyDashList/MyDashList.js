import React from 'react'
import MyDashCard from "../MyDashCard/MyDashCard"
const MyDashList = ({user,history}) => {
    return (
        <div>
            {user ? user.ownedDash.map((e) => (<MyDashCard dashid={e} history={history}/>)) : null}
        </div>
    )
}

export default MyDashList
