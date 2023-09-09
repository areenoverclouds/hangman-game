import React from "react"

export default function Notification(props){
    
    return(
        <div className={`notification-container ${props.showNotification ? 'show' : ''}`}>
            <p>You have already entered this letter</p>
        </div>
    )
}